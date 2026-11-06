import { Router, Request, Response } from 'express';
import { loginSchema, registerSchema } from '@urimai/validation';
import { validateRequest } from '../middleware/validate';
import { comparePassword, generateToken, hashPassword } from '../utils/auth';
import { prisma } from '../db/prisma';

const router = Router();

router.post('/login', validateRequest(loginSchema), async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.passwordHash || !password) {
      // OTP-only account, or no password supplied
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user.id, role: user.role, districtId: user.districtId });
    return res.json({
      token,
      user: { id: user.id, phoneNumber: user.phoneNumber, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Citizen self-signup. The role is always CITIZEN; it can never be chosen by the caller.
router.post('/register', validateRequest(registerSchema), async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password, districtId, languagePref } = req.body;

    const existing = await prisma.user.findUnique({ where: { phoneNumber } });
    if (existing) {
      return res.status(409).json({ error: 'This phone number is already registered' });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { phoneNumber, passwordHash, role: 'CITIZEN', districtId, languagePref }
    });

    const token = generateToken({ userId: user.id, role: user.role, districtId: user.districtId });
    return res.status(201).json({
      token,
      user: { id: user.id, phoneNumber: user.phoneNumber, role: user.role }
    });
  } catch (error: any) {
    // Two signups for the same number at the same moment
    if (error?.code === 'P2002') {
      return res.status(409).json({ error: 'This phone number is already registered' });
    }
    console.error('Register error:', error?.message ?? error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;