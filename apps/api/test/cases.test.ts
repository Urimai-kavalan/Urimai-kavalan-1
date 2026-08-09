import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { prisma } from '../src/db/prisma';

// Hoist vi.mock so it's applied before importing app
vi.mock('../src/middleware/rbac', () => ({
  requireAuth: (req: any, res: any, next: any) => {
    req.user = { userId: 'citizen-1', role: 'CITIZEN' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next(),
}));

import app from '../src/app';

describe('Cases Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/cases/me', () => {
    it('should return cases for authenticated user', async () => {
      (prisma.case.findMany as any).mockResolvedValue([
        { id: 'case-1', familyId: 'citizen-1' }
      ]);

      const response = await request(app).get('/api/cases/me');
      
      expect(response.status).toBe(200);
      expect(response.body.cases).toHaveLength(1);
      expect(response.body.cases[0].id).toBe('case-1');
    });
  });
});
