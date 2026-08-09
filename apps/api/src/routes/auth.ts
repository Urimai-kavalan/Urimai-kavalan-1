import { Router, Request, Response } from 'express';
import { loginSchema } from '@urimai/validation';
import { validateRequest } from '../middleware/validate';
import { comparePassword, generateToken } from '../utils/auth';
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

    if (!user.passwordHash) {
      // OTP-only account — cannot log in with a password
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user.id, role: user.role });
    return res.json({ 
      token, 
      user: { id: user.id, phoneNumber: user.phoneNumber, role: user.role } 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
