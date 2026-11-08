import { Router, Response, NextFunction } from 'express';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { caseIntakeSchema, eligibilityReviewSchema } from '@urimai/validation';
import { assessEligibility, CaseInput } from '../services/eligibility';
import { prisma } from '../db/prisma';
import { Role, Prisma } from '@prisma/client';
import { JwtPayload } from '../utils/auth';

const router = Router();

const REVIEWERS = [Role.PLV, Role.LAWYER, Role.SYS_ADMIN];
const toJson = (v: unknown) => JSON.parse(JSON.stringify(v)) as Prisma.InputJsonValue;
const param = (v: string | string[] | undefined): string => (Array.isArray(v) ? v[0] : v ?? '');

// Which cases this user may see: admins see all, everyone else only their own district.
const caseScope = (user: JwtPayload): { districtId?: string } | null => {
  if (user.role === Role.SYS_ADMIN) return {};
  return user.districtId ? { districtId: user.districtId } : null;
};
const NO_DISTRICT = { error: 'No district assigned to this account' };

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

// Get cases in the reviewer's district (admins: all districts)
router.get('/', requireAuth, requireRole(REVIEWERS), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const scope = caseScope(req.user!);
    if (!scope) return res.status(403).json(NO_DISTRICT);

    const cases = await prisma.case.findMany({
      where: scope,
      include: {
        family: { select: { id: true, phoneNumber: true } },
        accused: { include: { offences: true } },
        assessments: { orderBy: { createdAt: 'desc' }, take: 1 }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ cases });
  } catch (error) {
    console.error('Error fetching all cases:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Run the eligibility engine on a case and store the result (PLV / Lawyer / Admin only)
router.post('/:id/eligibility', requireAuth, requireRole(REVIEWERS), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const scope = caseScope(req.user!);
    if (!scope) return res.status(403).json(NO_DISTRICT);

    const found = await prisma.case.findFirst({
      where: { id: param(req.params.id), ...scope },
      include: { accused: { include: { offences: true } } }
    });
    if (!found) return res.status(404).json({ error: 'Case not found' });
    if (!found.accused) return res.status(422).json({ error: 'No accused details recorded for this case' });

    const input: CaseInput = {
      chargesheetFiledOn: found.chargesheetFiledOn,
      accused: {
        custodyStartDate: found.accused.custodyStartDate,
        isFirstTimeOffender: found.accused.isFirstTimeOffender,
        otherPendingCases: found.accused.otherPendingCases,
        dataVerified: found.accused.dataVerified,
        offences: found.accused.offences.map((o) => ({
          act: o.act,
          section: o.section,
          isBailable: o.isBailable,
          maxSentenceYears: o.maxSentenceYears,
          punishableWithDeathOrLife: o.punishableWithDeathOrLife
        }))
      }
    };
    const assessment = assessEligibility(input);
    const userId = req.user!.userId;

    const saved = await prisma.$transaction(async (tx) => {
      const record = await tx.eligibilityAssessment.create({
        data: {
          caseId: found.id,
          rulesetVersion: assessment.rulesetVersion,
          overall: assessment.overall,
          result: toJson(assessment),
          inputSnapshot: toJson(input)
        }
      });
      await tx.caseEvent.create({
        data: {
          caseId: found.id,
          eventType: 'ELIGIBILITY_ASSESSED',
          actorId: userId,
          details: { assessmentId: record.id, overall: assessment.overall }
        }
      });
      return record;
    });

    return res.status(201).json({ assessment: saved });
  } catch (error) {
    next(error);
  }
});

// A reviewer confirms or overrides an assessment; every disagreement is logged
router.post('/:id/eligibility/:assessmentId/review', requireAuth, requireRole(REVIEWERS), validateRequest(eligibilityReviewSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { decision, note, overrideOverall } = req.body;
    const userId = req.user!.userId;

    const scope = caseScope(req.user!);
    if (!scope) return res.status(403).json(NO_DISTRICT);

    const assessment = await prisma.eligibilityAssessment.findFirst({
      where: { id: param(req.params.assessmentId), caseId: param(req.params.id), caseRecord: scope }
    });
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
    if (assessment.reviewDecision) return res.status(409).json({ error: 'Assessment already reviewed' });

    const overridden = decision === 'OVERRIDDEN';
    const updated = await prisma.$transaction(async (tx) => {
      const record = await tx.eligibilityAssessment.update({
        where: { id: assessment.id },
        data: {
          reviewerId: userId,
          reviewDecision: decision,
          reviewedAt: new Date(),
          reviewNote: note,
          overrideOverall: overridden ? overrideOverall : null
        }
      });
      await tx.caseEvent.create({
        data: {
          caseId: assessment.caseId,
          eventType: overridden ? 'AI_OVERRIDE' : 'ELIGIBILITY_CONFIRMED',
          actorId: userId,
          details: {
            assessmentId: assessment.id,
            aiOverall: assessment.overall,
            reviewerOverall: overridden ? overrideOverall : assessment.overall,
            note
          }
        }
      });
      return record;
    });

    return res.json({ assessment: updated });
  } catch (error) {
    next(error);
  }
});

// A reviewer confirms the accused's facts have been checked against documents
router.post('/:id/accused/verify', requireAuth, requireRole(REVIEWERS), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const scope = caseScope(req.user!);
    if (!scope) return res.status(403).json(NO_DISTRICT);

    const accused = await prisma.accused.findFirst({ where: { caseId: param(req.params.id), caseRecord: scope } });
    if (!accused) return res.status(404).json({ error: 'Accused details not found' });
    if (accused.dataVerified) return res.json({ accused });

    const updated = await prisma.$transaction(async (tx) => {
      const record = await tx.accused.update({ where: { id: accused.id }, data: { dataVerified: true } });
      await tx.caseEvent.create({
        data: { caseId: accused.caseId, eventType: 'DATA_VERIFIED', actorId: req.user!.userId, details: { accusedId: accused.id } }
      });
      return record;
    });
    return res.json({ accused: updated });
  } catch (error) {
    next(error);
  }
});

export default router;