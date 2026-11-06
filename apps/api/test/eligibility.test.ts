import { describe, it, expect } from 'vitest';
import { assessEligibility, CaseInput } from '../src/services/eligibility';

const d = (s: string) => new Date(`${s}T00:00:00Z`);
const plusDays = (s: string, n: number) =>
  new Date(d(s).getTime() + n * 86400000).toISOString().slice(0, 10);

const baseCase = (over: Partial<CaseInput['accused']> = {}, chargesheetFiledOn: Date | null = null): CaseInput => ({
  chargesheetFiledOn,
  accused: {
    custodyStartDate: d('2024-01-01'),
    isFirstTimeOffender: false,
    otherPendingCases: false,
    dataVerified: true,
    offences: [{ act: 'BNS', section: '303(2)', isBailable: false, maxSentenceYears: 7, punishableWithDeathOrLife: false }],
    ...over,
  },
});

const life = [{ act: 'BNS' as const, section: '103', isBailable: false, maxSentenceYears: 99, punishableWithDeathOrLife: true }];
const find = (a: ReturnType<typeof assessEligibility>, rule: string) => a.findings.find((f) => f.rule === rule)!;

describe('bailable offence', () => {
  it('is eligible now as of right', () => {
    const r = assessEligibility(baseCase({ offences: [{ act: 'BNS', section: 'x', isBailable: true, maxSentenceYears: 1 }] }), d('2024-01-02'));
    expect(find(r, 'BAILABLE_AS_OF_RIGHT').status).toBe('ELIGIBLE_NOW');
    expect(r.overall).toBe('ELIGIBLE_NOW');
  });
  it('is not applicable when any offence is non-bailable', () => {
    const r = assessEligibility(baseCase(), d('2024-01-02'));
    expect(find(r, 'BAILABLE_AS_OF_RIGHT').status).toBe('NOT_APPLICABLE');
  });
  it('needs data when bailable status is unknown', () => {
    const r = assessEligibility(baseCase({ offences: [{ act: 'BNS', section: 'x', isBailable: null, maxSentenceYears: 3 }] }), d('2024-01-02'));
    expect(find(r, 'BAILABLE_AS_OF_RIGHT').status).toBe('INSUFFICIENT_DATA');
  });
});

describe('BNSS 479', () => {
  it('uses one-half for repeat offenders (7 years -> 1278 days)', () => {
    const f = find(assessEligibility(baseCase(), d('2024-01-02')), 'BNSS_479');
    expect(f.status).toBe('ELIGIBLE_ON');
    expect(f.eligibleFrom).toBe(plusDays('2024-01-01', 1278));
  });
  it('uses one-third for first-time offenders (7 years -> 852 days)', () => {
    const r = assessEligibility(baseCase({ isFirstTimeOffender: true }), d('2024-01-02'));
    expect(find(r, 'BNSS_479').eligibleFrom).toBe(plusDays('2024-01-01', 852));
  });
  it('is eligible now once the period has passed', () => {
    const r = assessEligibility(baseCase({ isFirstTimeOffender: true }), d('2026-12-31'));
    expect(find(r, 'BNSS_479').status).toBe('ELIGIBLE_NOW');
    expect(r.overall).toBe('ELIGIBLE_NOW');
  });
  it('is not applicable for death/life offences', () => {
    const r = assessEligibility(baseCase({ offences: life }), d('2030-01-01'));
    expect(find(r, 'BNSS_479').status).toBe('NOT_APPLICABLE');
  });
  it('is not applicable with other pending cases', () => {
    const r = assessEligibility(baseCase({ otherPendingCases: true }), d('2030-01-01'));
    expect(find(r, 'BNSS_479').status).toBe('NOT_APPLICABLE');
  });
  it('uses the longer period and warns when first-time status is unknown', () => {
    const r = assessEligibility(baseCase({ isFirstTimeOffender: null }), d('2024-01-02'));
    expect(find(r, 'BNSS_479').eligibleFrom).toBe(plusDays('2024-01-01', 1278));
    expect(r.warnings.join(' ')).toMatch(/first-time/i);
  });
  it('needs data without a custody start date', () => {
    const r = assessEligibility(baseCase({ custodyStartDate: null }), d('2024-01-02'));
    expect(find(r, 'BNSS_479').status).toBe('INSUFFICIENT_DATA');
  });
});

describe('default bail', () => {
  it('uses 60 days for lesser offences: right arises on day 61', () => {
    const f = find(assessEligibility(baseCase(), d('2024-03-01')), 'DEFAULT_BAIL');
    expect(f.eligibleFrom).toBe(plusDays('2024-01-01', 61));
    expect(f.status).toBe('ELIGIBLE_ON');
  });
  it('becomes eligible now after the 60-day period with no chargesheet', () => {
    const r = assessEligibility(baseCase(), d('2024-03-05'));
    expect(find(r, 'DEFAULT_BAIL').status).toBe('ELIGIBLE_NOW');
    expect(r.overall).toBe('ELIGIBLE_NOW');
  });
  it('uses 90 days for death/life offences', () => {
    const f = find(assessEligibility(baseCase({ offences: life }), d('2024-03-05')), 'DEFAULT_BAIL');
    expect(f.eligibleFrom).toBe(plusDays('2024-01-01', 91));
    expect(f.status).toBe('ELIGIBLE_ON');
  });
  it('is not applicable once a chargesheet is filed', () => {
    const r = assessEligibility(baseCase({}, d('2024-02-01')), d('2024-03-05'));
    expect(find(r, 'DEFAULT_BAIL').status).toBe('NOT_APPLICABLE');
  });
});

describe('safety properties', () => {
  it('always requires human review', () => {
    expect(assessEligibility(baseCase(), d('2024-03-05')).requiresHumanReview).toBe(true);
  });
  it('warns when data is unverified', () => {
    const r = assessEligibility(baseCase({ dataVerified: false }), d('2024-03-05'));
    expect(r.warnings.join(' ')).toMatch(/not yet verified/i);
  });
  it('reports NEEDS_DATA when there are no offences', () => {
    const r = assessEligibility(baseCase({ offences: [] }), d('2024-03-05'));
    expect(r.overall).toBe('NEEDS_DATA');
  });
});