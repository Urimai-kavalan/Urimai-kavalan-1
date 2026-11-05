import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().optional(), // Nullable for OTP
  otp: z.string().optional(),
});

export const offenceSchema = z.object({
  act: z.enum(['BNS', 'IPC', 'SPECIAL']),
  section: z.string().min(1),
  isBailable: z.boolean().optional(),
  maxSentenceYears: z.number().positive().optional(),
  punishableWithDeathOrLife: z.boolean().default(false),
});

export const accusedSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  custodyStartDate: z.coerce.date().optional(),
  isFirstTimeOffender: z.boolean().optional(),
  otherPendingCases: z.boolean().default(false),
  offences: z.array(offenceSchema).default([]),
});

export const caseIntakeSchema = z.object({
  policeStation: z.string().min(1, 'Police station is required'),
  districtId: z.string().min(1, 'District ID is required'),
  firNumber: z.string().optional(),
  cnrNumber: z.string().optional(),
  chargesheetFiledOn: z.coerce.date().optional(),
  accused: accusedSchema.optional(),
});

export const aiOverrideSchema = z.object({
  caseId: z.string().uuid(),
  reason: z.string().min(10, 'Override reason must be detailed'),
  newStatus: z.string(),
});