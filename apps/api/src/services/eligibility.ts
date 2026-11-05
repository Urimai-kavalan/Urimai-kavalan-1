// Bail eligibility engine (DRAFT ruleset).
// Pure function: no database, no network. Advisory only -- a PLV or lawyer must review every result.
// The legal rules below MUST be confirmed by a qualified advocate before use with real families.

export const RULESET_VERSION = '0.1.0-draft';

export type OffenceInput = {
  act: 'BNS' | 'IPC' | 'SPECIAL';
  section: string;
  isBailable?: boolean | null;
  maxSentenceYears?: number | null;
  punishableWithDeathOrLife?: boolean;
};

export type AccusedInput = {
  custodyStartDate?: Date | null;
  isFirstTimeOffender?: boolean | null;
  otherPendingCases?: boolean;
  dataVerified?: boolean;
  offences: OffenceInput[];
};

export type CaseInput = {
  chargesheetFiledOn?: Date | null;
  accused: AccusedInput;
};

export type RuleId = 'BAILABLE_AS_OF_RIGHT' | 'BNSS_479' | 'DEFAULT_BAIL';
export type RuleStatus =
  | 'ELIGIBLE_NOW'
  | 'ELIGIBLE_ON'
  | 'NOT_ELIGIBLE'
  | 'NOT_APPLICABLE'
  | 'INSUFFICIENT_DATA';

export interface Finding {
  rule: RuleId;
  status: RuleStatus;
  eligibleFrom?: string; // YYYY-MM-DD
  reasons: string[];
  citations: string[];
}

export interface Assessment {
  rulesetVersion: string;
  asOf: string;
  findings: Finding[];
  overall: 'ELIGIBLE_NOW' | 'ELIGIBLE_SOON' | 'NOT_ELIGIBLE' | 'NEEDS_DATA';
  requiresHumanReview: true; // always true: this tool never decides
  warnings: string[];
}

const DAY_MS = 24 * 60 * 60 * 1000;
const DAYS_PER_YEAR = 365; // convention for this draft; advocate to confirm

const startOfUtcDay = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
const addDays = (d: Date, n: number) => new Date(startOfUtcDay(d).getTime() + n * DAY_MS);
const iso = (d: Date) => d.toISOString().slice(0, 10);
const label = (o: OffenceInput) => `${o.act} s.${o.section}`;

function statusFor(eligibleFrom: Date, asOf: Date): RuleStatus {
  return startOfUtcDay(asOf).getTime() >= eligibleFrom.getTime() ? 'ELIGIBLE_NOW' : 'ELIGIBLE_ON';
}

// Rule 1: bailable offence -> bail as of right
function bailableRule(offences: OffenceInput[]): Finding {
  const citations = ['BNSS s.478 (formerly CrPC s.436)'];
  if (offences.length === 0) {
    return { rule: 'BAILABLE_AS_OF_RIGHT', status: 'INSUFFICIENT_DATA', reasons: ['No offence recorded.'], citations };
  }
  const unknown = offences.filter((o) => o.isBailable === null || o.isBailable === undefined);
  if (unknown.length > 0) {
    return {
      rule: 'BAILABLE_AS_OF_RIGHT',
      status: 'INSUFFICIENT_DATA',
      reasons: [`Bailable status unknown for: ${unknown.map(label).join(', ')}.`],
      citations,
    };
  }
  const nonBailable = offences.filter((o) => o.isBailable === false);
  if (nonBailable.length > 0) {
    return {
      rule: 'BAILABLE_AS_OF_RIGHT',
      status: 'NOT_APPLICABLE',
      reasons: [`Non-bailable offence(s): ${nonBailable.map(label).join(', ')}.`],
      citations,
    };
  }
  return {
    rule: 'BAILABLE_AS_OF_RIGHT',
    status: 'ELIGIBLE_NOW',
    reasons: ['All recorded offences are bailable; bail is a matter of right if the accused is ready to furnish bail.'],
    citations,
  };
}

// Rule 2: BNSS 479 -- detention for 1/2 (or 1/3 for first-time offenders) of the maximum sentence
function section479Rule(accused: AccusedInput, asOf: Date, warnings: string[]): Finding {
  const citations = ['BNSS s.479 (formerly CrPC s.436A)'];
  const { offences } = accused;
  const base = { rule: 'BNSS_479' as const, citations };

  if (offences.length === 0) return { ...base, status: 'INSUFFICIENT_DATA', reasons: ['No offence recorded.'] };

  if (offences.some((o) => o.punishableWithDeathOrLife)) {
    return { ...base, status: 'NOT_APPLICABLE', reasons: ['Offence punishable with death or life imprisonment is excluded from this provision.'] };
  }
  if (accused.otherPendingCases) {
    return { ...base, status: 'NOT_APPLICABLE', reasons: ['Pending proceedings in more than one case: this provision does not apply.'] };
  }
  const missingMax = offences.filter((o) => o.maxSentenceYears == null);
  if (!accused.custodyStartDate || missingMax.length > 0) {
    const reasons: string[] = [];
    if (!accused.custodyStartDate) reasons.push('Custody start date missing.');
    if (missingMax.length > 0) reasons.push(`Maximum sentence missing for: ${missingMax.map(label).join(', ')}.`);
    return { ...base, status: 'INSUFFICIENT_DATA', reasons };
  }

  let firstTime = accused.isFirstTimeOffender;
  if (firstTime === null || firstTime === undefined) {
    firstTime = false;
    warnings.push('First-time-offender status unknown: the longer one-half period was used.');
  }
  if (offences.length > 1) {
    warnings.push('Multiple offences: the longest maximum sentence was used. Advocate to confirm.');
  }

  const maxYears = Math.max(...offences.map((o) => o.maxSentenceYears as number));
  const fraction = firstTime ? 1 / 3 : 1 / 2;
  const days = Math.ceil(maxYears * fraction * DAYS_PER_YEAR);
  const eligibleFrom = addDays(accused.custodyStartDate, days);

  return {
    ...base,
    status: statusFor(eligibleFrom, asOf),
    eligibleFrom: iso(eligibleFrom),
    reasons: [
      `Maximum sentence ${maxYears} years; ${firstTime ? 'one-third (first-time offender)' : 'one-half'} = ${days} days of custody.`,
    ],
  };
}

// Rule 3: default bail -- investigation not finished within 60/90 days
function defaultBailRule(caseInput: CaseInput, asOf: Date, warnings: string[]): Finding {
  const citations = ['BNSS s.187 (formerly CrPC s.167(2))'];
  const { accused } = caseInput;
  const { offences } = accused;
  const base = { rule: 'DEFAULT_BAIL' as const, citations };

  if (!accused.custodyStartDate || offences.length === 0) {
    return { ...base, status: 'INSUFFICIENT_DATA', reasons: ['Custody start date and offence details are needed.'] };
  }
  if (caseInput.chargesheetFiledOn) {
    return {
      ...base,
      status: 'NOT_APPLICABLE',
      reasons: [
        `Chargesheet filed on ${iso(caseInput.chargesheetFiledOn)}. If it was filed after the 60/90-day period, a lawyer must check whether the right had already accrued.`,
      ],
    };
  }
  const missingMax = offences.filter((o) => !o.punishableWithDeathOrLife && o.maxSentenceYears == null);
  if (missingMax.length > 0) {
    return { ...base, status: 'INSUFFICIENT_DATA', reasons: [`Maximum sentence missing for: ${missingMax.map(label).join(', ')}.`] };
  }

  const serious = offences.some((o) => o.punishableWithDeathOrLife || (o.maxSentenceYears ?? 0) >= 10);
  const period = serious ? 90 : 60;
  if (serious && !offences.some((o) => o.punishableWithDeathOrLife)) {
    warnings.push('Maximum sentence is 10+ years: 90 days was used. The law refers to a MINIMUM of 10 years; advocate to confirm.');
  }
  warnings.push('Custody start date is used as a stand-in for the date of first remand. Advocate to confirm.');

  const eligibleFrom = addDays(accused.custodyStartDate, period + 1);
  return {
    ...base,
    status: statusFor(eligibleFrom, asOf),
    eligibleFrom: iso(eligibleFrom),
    reasons: [`${period}-day investigation period; no chargesheet recorded. Right arises after day ${period}.`],
  };
}

export function assessEligibility(caseInput: CaseInput, asOf: Date = new Date()): Assessment {
  const warnings: string[] = [];
  const { accused } = caseInput;

  if (!accused.dataVerified) {
    warnings.push('Facts are not yet verified by a PLV or lawyer: treat this result as indicative only.');
  }

  const findings: Finding[] = [
    bailableRule(accused.offences),
    section479Rule(accused, asOf, warnings),
    defaultBailRule(caseInput, asOf, warnings),
  ];

  let overall: Assessment['overall'];
  if (findings.some((f) => f.status === 'ELIGIBLE_NOW')) overall = 'ELIGIBLE_NOW';
  else if (findings.some((f) => f.status === 'ELIGIBLE_ON')) overall = 'ELIGIBLE_SOON';
  else if (findings.some((f) => f.status === 'INSUFFICIENT_DATA')) overall = 'NEEDS_DATA';
  else overall = 'NOT_ELIGIBLE';

  return {
    rulesetVersion: RULESET_VERSION,
    asOf: iso(asOf),
    findings,
    overall,
    requiresHumanReview: true,
    warnings: Array.from(new Set(warnings)),
  };
}