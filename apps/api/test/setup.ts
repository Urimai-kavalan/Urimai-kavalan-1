import { vi } from 'vitest';

// Required by src/utils/auth.ts; must be set before any app code is imported
process.env.JWT_SECRET = 'test-secret';

// Mock Prisma for unit testing without a live DB
vi.mock('../src/db/prisma', () => {
  const prisma: any = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    case: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    accused: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    eligibilityAssessment: {
      create: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    caseEvent: {
      create: vi.fn(),
    },
    $disconnect: vi.fn(),
  };
  // Run transaction callbacks against the same mock client
  prisma.$transaction = vi.fn(async (fn: any) => fn(prisma));
  return { prisma };
});