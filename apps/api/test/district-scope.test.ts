import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { prisma } from '../src/db/prisma';

// The test user's role and district come from request headers
vi.mock('../src/middleware/rbac', () => ({
  requireAuth: (req: any, res: any, next: any) => {
    const district = req.headers['x-test-district'];
    req.user = {
      userId: 'user-1',
      role: req.headers['x-test-role'] ?? 'PLV',
      districtId: district === 'none' ? null : district ?? 'chennai-01',
    };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next(),
}));

import app from '../src/app';

const p = prisma as any;

describe('GET /api/cases (district scoping)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    p.case.findMany.mockResolvedValue([]);
  });

  it('limits a PLV to their own district', async () => {
    const res = await request(app).get('/api/cases');
    expect(res.status).toBe(200);
    expect(p.case.findMany.mock.calls[0][0].where).toEqual({ districtId: 'chennai-01' });
  });

  it('lets an admin see every district', async () => {
    const res = await request(app).get('/api/cases').set('x-test-role', 'SYS_ADMIN').set('x-test-district', 'none');
    expect(res.status).toBe(200);
    expect(p.case.findMany.mock.calls[0][0].where).toEqual({});
  });

  it('refuses a PLV with no district', async () => {
    const res = await request(app).get('/api/cases').set('x-test-district', 'none');
    expect(res.status).toBe(403);
    expect(p.case.findMany).not.toHaveBeenCalled();
  });
});

describe('eligibility routes respect the district', () => {
  beforeEach(() => vi.clearAllMocks());

  it('only looks up cases in the reviewer district', async () => {
    p.case.findFirst.mockResolvedValue(null);
    const res = await request(app).post('/api/cases/case-9/eligibility');
    expect(res.status).toBe(404); // a case in another district looks like it does not exist
    expect(p.case.findFirst.mock.calls[0][0].where).toEqual({ id: 'case-9', districtId: 'chennai-01' });
  });

  it('does not restrict admins', async () => {
    p.case.findFirst.mockResolvedValue(null);
    await request(app).post('/api/cases/case-9/eligibility').set('x-test-role', 'SYS_ADMIN').set('x-test-district', 'none');
    expect(p.case.findFirst.mock.calls[0][0].where).toEqual({ id: 'case-9' });
  });

  it('refuses a reviewer with no district', async () => {
    const res = await request(app).post('/api/cases/case-9/eligibility').set('x-test-district', 'none');
    expect(res.status).toBe(403);
  });

  it('scopes the review lookup by district', async () => {
    p.eligibilityAssessment.findFirst.mockResolvedValue(null);
    const res = await request(app)
      .post('/api/cases/case-9/eligibility/asm-9/review')
      .send({ decision: 'CONFIRMED', note: 'Checked against the remand order' });
    expect(res.status).toBe(404);
    expect(p.eligibilityAssessment.findFirst.mock.calls[0][0].where.caseRecord).toEqual({ districtId: 'chennai-01' });
  });

  it('scopes the verify lookup by district', async () => {
    p.accused.findFirst.mockResolvedValue(null);
    const res = await request(app).post('/api/cases/case-9/accused/verify');
    expect(res.status).toBe(404);
    expect(p.accused.findFirst.mock.calls[0][0].where.caseRecord).toEqual({ districtId: 'chennai-01' });
  });
});