import { vi } from 'vitest';

// Mock Prisma for unit testing without a live DB
vi.mock('../src/db/prisma', () => {
  return {
    prisma: {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
      case: {
        findMany: vi.fn(),
        create: vi.fn(),
      },
      $disconnect: vi.fn(),
    }
  };
});
