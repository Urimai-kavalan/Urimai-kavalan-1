import { Router, Response } from 'express';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { caseIntakeSchema } from '@urimai/validation';
import { prisma } from '../db/prisma';
import { Role } from '@prisma/client';

const router = Router();

// Get cases for the logged-in citizen
router.get('/me', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const cases = await prisma.case.findMany({
      where: { familyId: userId },
      include: {
        assignedLawyer: { select: { id: true, phoneNumber: true } },
        documents: true,
        accused: { include: { offences: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ cases });
  } catch (error) {
    console.error('Error fetching my cases:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new case
router.post('/', requireAuth, validateRequest(caseIntakeSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { policeStation, districtId, firNumber, cnrNumber, chargesheetFiledOn, accused } = req.body;

    const newCase = await prisma.case.create({
      data: {
        policeStation,
        districtId,
        firNumber,
        cnrNumber,
        chargesheetFiledOn,
        familyId: userId,
        status: 'NEW',
        accused: accused
          ? { create: { ...accused, offences: { create: accused.offences } } }
          : undefined,
        events: {
          create: {
            eventType: 'CASE_CREATED',
            actorId: userId,
            details: { method: 'app_intake' }
          }
        }
      },
      include: { accused: { include: { offences: true } } }
    });

    return res.status(201).json({ case: newCase });
  } catch (error) {
    console.error('Error creating case:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all cases (PLV / Lawyer / Admin only)
router.get('/', requireAuth, requireRole([Role.PLV, Role.LAWYER, Role.SYS_ADMIN]), async (req: AuthenticatedRequest, res: Response) => {
  try {
    // In a real app, we'd filter by districtId for PLVs, etc.
    const cases = await prisma.case.findMany({
      include: {
        family: { select: { id: true, phoneNumber: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ cases });
  } catch (error) {
    console.error('Error fetching all cases:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;