import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().optional(), // Nullable for OTP
  otp: z.string().optional(),
});

export const caseIntakeSchema = z.object({
  policeStation: z.string().min(1, 'Police station is required'),
  districtId: z.string().uuid('Invalid district ID'),
  firNumber: z.string().optional(),
  cnrNumber: z.string().optional(),
});

export const aiOverrideSchema = z.object({
  caseId: z.string().uuid(),
  reason: z.string().min(10, 'Override reason must be detailed'),
  newStatus: z.string(),
});
