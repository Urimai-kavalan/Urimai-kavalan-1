import { vi } from 'vitest';

// Mock Prisma for unit testing without a live DB
vi.mock('../src/db/prisma', () => {
  const prisma: any = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    case: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    accused: {
      findUnique: vi.fn(),
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