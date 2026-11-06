import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { prisma } from '../src/db/prisma';

vi.mock('../src/middleware/rbac', () => ({
  requireAuth: (req: any, res: any, next: any) => {
    req.user = { userId: 'plv-1', role: 'PLV', districtId: 'chennai-01' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next(),
}));

import app from '../src/app';

const p = prisma as any;

const caseWithAccused = {
  id: 'case-1',
  chargesheetFiledOn: null,
  accused: {
    id: 'acc-1',
    custodyStartDate: new Date('2024-01-01T00:00:00Z'),
    isFirstTimeOffender: true,
    otherPendingCases: false,
    dataVerified: true,
    offences: [{ act: 'BNS', section: '303(2)', isBailable: false, maxSentenceYears: 7, punishableWithDeathOrLife: false }],
  },
};

describe('POST /api/cases/:id/eligibility', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 404 when the case does not exist', async () => {
    p.case.findFirst.mockResolvedValue(null);
    const res = await request(app).post('/api/cases/nope/eligibility');
    expect(res.status).toBe(404);
  });

  it('returns 422 when no accused details are recorded', async () => {
    p.case.findFirst.mockResolvedValue({ id: 'case-1', accused: null });
    const res = await request(app).post('/api/cases/case-1/eligibility');
    expect(res.status).toBe(422);
  });

  it('stores the assessment and logs an event', async () => {
    p.case.findFirst.mockResolvedValue(caseWithAccused);
    p.eligibilityAssessment.create.mockResolvedValue({ id: 'asm-1', overall: 'ELIGIBLE_SOON' });
    const res = await request(app).post('/api/cases/case-1/eligibility');
    expect(res.status).toBe(201);
    expect(p.eligibilityAssessment.create).toHaveBeenCalledTimes(1);
    expect(p.caseEvent.create.mock.calls[0][0].data.eventType).toBe('ELIGIBILITY_ASSESSED');
  });
});

describe('POST /api/cases/:id/eligibility/:assessmentId/review', () => {
  beforeEach(() => vi.clearAllMocks());
  const url = '/api/cases/case-1/eligibility/asm-1/review';

  it('rejects an override without a replacement result', async () => {
    const res = await request(app).post(url).send({ decision: 'OVERRIDDEN', note: 'Disagree with the engine result' });
    expect(res.status).toBe(400);
  });

  it('rejects a note that is too short', async () => {
    const res = await request(app).post(url).send({ decision: 'CONFIRMED', note: 'ok' });
    expect(res.status).toBe(400);
  });

  it('returns 409 when already reviewed', async () => {
    p.eligibilityAssessment.findFirst.mockResolvedValue({ id: 'asm-1', caseId: 'case-1', overall: 'ELIGIBLE_NOW', reviewDecision: 'CONFIRMED' });
    const res = await request(app).post(url).send({ decision: 'CONFIRMED', note: 'Checked against the FIR copy' });
    expect(res.status).toBe(409);
  });

  it('logs an AI_OVERRIDE event when the reviewer disagrees', async () => {
    p.eligibilityAssessment.findFirst.mockResolvedValue({ id: 'asm-1', caseId: 'case-1', overall: 'ELIGIBLE_NOW', reviewDecision: null });
    p.eligibilityAssessment.update.mockResolvedValue({ id: 'asm-1', reviewDecision: 'OVERRIDDEN' });
    const res = await request(app).post(url).send({ decision: 'OVERRIDDEN', note: 'Second case pending, 479 does not apply', overrideOverall: 'NOT_ELIGIBLE' });
    expect(res.status).toBe(200);
    const event = p.caseEvent.create.mock.calls[0][0].data;
    expect(event.eventType).toBe('AI_OVERRIDE');
    expect(event.details.aiOverall).toBe('ELIGIBLE_NOW');
    expect(event.details.reviewerOverall).toBe('NOT_ELIGIBLE');
  });

  it('logs ELIGIBILITY_CONFIRMED when the reviewer agrees', async () => {
    p.eligibilityAssessment.findFirst.mockResolvedValue({ id: 'asm-1', caseId: 'case-1', overall: 'ELIGIBLE_NOW', reviewDecision: null });
    p.eligibilityAssessment.update.mockResolvedValue({ id: 'asm-1', reviewDecision: 'CONFIRMED' });
    const res = await request(app).post(url).send({ decision: 'CONFIRMED', note: 'Verified against remand order' });
    expect(res.status).toBe(200);
    expect(p.caseEvent.create.mock.calls[0][0].data.eventType).toBe('ELIGIBILITY_CONFIRMED');
  });
});

describe('POST /api/cases/:id/accused/verify', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 404 when there is no accused record', async () => {
    p.accused.findFirst.mockResolvedValue(null);
    const res = await request(app).post('/api/cases/case-1/accused/verify');
    expect(res.status).toBe(404);
  });

  it('marks the data verified and logs an event', async () => {
    p.accused.findFirst.mockResolvedValue({ id: 'acc-1', caseId: 'case-1', dataVerified: false });
    p.accused.update.mockResolvedValue({ id: 'acc-1', dataVerified: true });
    const res = await request(app).post('/api/cases/case-1/accused/verify');
    expect(res.status).toBe(200);
    expect(p.caseEvent.create.mock.calls[0][0].data.eventType).toBe('DATA_VERIFIED');
  });
});