import React, { useCallback, useEffect, useState } from 'react';
import { fetchApi } from '../utils/api';
import { useAuth } from '../context/useAuth';

type Overall = 'ELIGIBLE_NOW' | 'ELIGIBLE_SOON' | 'NOT_ELIGIBLE' | 'NEEDS_DATA';

interface Finding {
  rule: string;
  status: string;
  eligibleFrom?: string;
  reasons: string[];
  citations: string[];
}

interface Assessment {
  id: string;
  overall: Overall;
  createdAt: string;
  result: { findings: Finding[]; warnings: string[]; rulesetVersion: string };
  reviewDecision?: 'CONFIRMED' | 'OVERRIDDEN' | null;
  reviewNote?: string | null;
  overrideOverall?: Overall | null;
}

interface CaseRow {
  id: string;
  firNumber?: string | null;
  policeStation: string;
  status: string;
  createdAt: string;
  family?: { phoneNumber: string };
  accused?: {
    id: string;
    name: string;
    dataVerified: boolean;
    custodyStartDate?: string | null;
    offences: { id: string; act: string; section: string; isBailable?: boolean | null; maxSentenceYears?: number | null }[];
  } | null;
  assessments?: Assessment[];
}

const REVIEWER_ROLES = ['PLV', 'LAWYER', 'SYS_ADMIN'];

const OVERALL_LABEL: Record<Overall, string> = {
  ELIGIBLE_NOW: 'May be eligible now',
  ELIGIBLE_SOON: 'Eligible on a future date',
  NOT_ELIGIBLE: 'Not eligible on current facts',
  NEEDS_DATA: 'More information needed',
};

const OVERALL_STYLE: Record<Overall, string> = {
  ELIGIBLE_NOW: 'bg-green-100 text-green-800',
  ELIGIBLE_SOON: 'bg-blue-100 text-blue-800',
  NOT_ELIGIBLE: 'bg-gray-200 text-gray-800',
  NEEDS_DATA: 'bg-yellow-100 text-yellow-800',
};

const RULE_LABEL: Record<string, string> = {
  BAILABLE_AS_OF_RIGHT: 'Bailable offence (bail as of right)',
  BNSS_479: 'Time served (BNSS s.479)',
  DEFAULT_BAIL: 'Default bail (BNSS s.187)',
};

const STATUS_LABEL: Record<string, string> = {
  ELIGIBLE_NOW: 'Eligible now',
  ELIGIBLE_ON: 'Eligible from',
  NOT_ELIGIBLE: 'Not eligible',
  NOT_APPLICABLE: 'Does not apply',
  INSUFFICIENT_DATA: 'More information needed',
};

const formatDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString('en-IN') : '');

const AssessmentView: React.FC<{ caseId: string; assessment: Assessment; onChanged: () => void }> = ({
  caseId,
  assessment,
  onChanged,
}) => {
  const [note, setNote] = useState('');
  const [override, setOverride] = useState<Overall>('NOT_ELIGIBLE');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submitReview = async (decision: 'CONFIRMED' | 'OVERRIDDEN') => {
    setError('');
    if (note.trim().length < 10) {
      setError('Please write a note of at least 10 characters.');
      return;
    }
    setBusy(true);
    try {
      await fetchApi(`/cases/${caseId}/eligibility/${assessment.id}/review`, {
        method: 'POST',
        body: JSON.stringify({
          decision,
          note: note.trim(),
          overrideOverall: decision === 'OVERRIDDEN' ? override : undefined,
        }),
      });
      setNote('');
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the review.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 border rounded-lg p-4 bg-bg-base space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${OVERALL_STYLE[assessment.overall]}`}>
          {OVERALL_LABEL[assessment.overall]}
        </span>
        <span className="text-xs text-text-secondary">
          Draft rules {assessment.result.rulesetVersion}, checked {formatDate(assessment.createdAt)}
        </span>
      </div>

      <ul className="space-y-2">
        {assessment.result.findings.map((f) => (
          <li key={f.rule} className="text-sm">
            <p className="font-medium">
              {RULE_LABEL[f.rule] ?? f.rule}: {STATUS_LABEL[f.status] ?? f.status}
              {f.eligibleFrom ? ` ${formatDate(f.eligibleFrom)}` : ''}
            </p>
            {f.reasons.map((r, i) => (
              <p key={i} className="text-text-secondary">{r}</p>
            ))}
            <p className="text-xs text-text-muted">{f.citations.join('; ')}</p>
          </li>
        ))}
      </ul>

      {assessment.result.warnings.length > 0 && (
        <div className="bg-warning-bg text-warning-text text-sm p-3 rounded">
          <p className="font-medium mb-1">Check before relying on this:</p>
          <ul className="list-disc pl-5 space-y-1">
            {assessment.result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {assessment.reviewDecision ? (
        <div className="text-sm border-t pt-3">
          <p className="font-medium">
            {assessment.reviewDecision === 'CONFIRMED'
              ? 'Reviewer confirmed this result'
              : `Reviewer disagreed. Their result: ${assessment.overrideOverall ? OVERALL_LABEL[assessment.overrideOverall] : ''}`}
          </p>
          <p className="text-text-secondary">{assessment.reviewNote}</p>
        </div>
      ) : (
        <div className="border-t pt-3 space-y-3">
          <p className="text-sm font-medium">Your review (required before this is used with a family)</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="w-full border rounded-lg p-3 text-sm"
            placeholder="What did you check, for example the remand order or FIR copy?"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => submitReview('CONFIRMED')}
              className="btn-primary text-sm py-2 disabled:opacity-50"
            >
              I agree with this result
            </button>
            <span className="text-sm text-text-secondary">or I disagree. My result:</span>
            <select
              value={override}
              onChange={(e) => setOverride(e.target.value as Overall)}
              className="border rounded-lg p-2 text-sm bg-white"
            >
              {(Object.keys(OVERALL_LABEL) as Overall[]).map((k) => (
                <option key={k} value={k}>{OVERALL_LABEL[k]}</option>
              ))}
            </select>
            <button
              type="button"
              disabled={busy}
              onClick={() => submitReview('OVERRIDDEN')}
              className="text-sm py-2 px-3 border border-red-600 text-red-600 rounded-lg disabled:opacity-50"
            >
              I disagree
            </button>
          </div>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        </div>
      )}
    </div>
  );
};

export const Review: React.FC = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const allowed = !!user && REVIEWER_ROLES.includes(user.role);

  const load = useCallback(async () => {
    try {
      const data = await fetchApi('/cases');
      setCases(data.cases);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load cases.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) load();
  }, [allowed, load]);

  const act = async (caseId: string, path: string) => {
    setBusyId(caseId);
    setError('');
    try {
      await fetchApi(`/cases/${caseId}/${path}`, { method: 'POST' });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed.');
    } finally {
      setBusyId(null);
    }
  };

  if (!allowed) {
    return <div className="p-6 text-center text-text-secondary">This page is for volunteers and lawyers.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Case review</h1>
        <p className="text-text-secondary">
          Cases in your district. The eligibility check is a draft aid: a person must confirm every result.
        </p>
      </header>

      {error && <p className="text-red-600" role="alert">{error}</p>}
      {loading && <p className="text-text-muted">Loading...</p>}
      {!loading && cases.length === 0 && <p className="text-text-muted">No cases in your district yet.</p>}

      {cases.map((c) => {
        const latest = c.assessments?.[0];
        return (
          <div key={c.id} className="card p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-bold text-text-primary">
                  {c.accused?.name ?? 'Name not given'}
                  {c.firNumber ? `, FIR ${c.firNumber}` : ''}
                </p>
                <p className="text-sm text-text-secondary">
                  {c.policeStation}. Family contact: {c.family?.phoneNumber ?? 'n/a'}. Registered {formatDate(c.createdAt)}
                </p>
              </div>
              {c.accused && (
                <span
                  className={`h-fit text-xs font-bold px-2 py-1 rounded-full ${
                    c.accused.dataVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {c.accused.dataVerified ? 'Facts verified' : 'Facts not yet verified'}
                </span>
              )}
            </div>

            {c.accused ? (
              <>
                <p className="text-sm mt-2">
                  Arrest date: {c.accused.custodyStartDate ? formatDate(c.accused.custodyStartDate) : 'not given'}.
                  Offences:{' '}
                  {c.accused.offences.length
                    ? c.accused.offences
                        .map((o) => `${o.act} ${o.section}${o.maxSentenceYears ? ` (max ${o.maxSentenceYears} yrs)` : ''}`)
                        .join(', ')
                    : 'none entered'}
                </p>

                <div className="flex flex-wrap gap-3 mt-3">
                  {!c.accused.dataVerified && (
                    <button
                      type="button"
                      disabled={busyId === c.id}
                      onClick={() => act(c.id, 'accused/verify')}
                      className="text-sm py-2 px-3 border border-primary text-primary rounded-lg disabled:opacity-50"
                    >
                      I have checked these facts against the documents
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busyId === c.id}
                    onClick={() => act(c.id, 'eligibility')}
                    className="btn-primary text-sm py-2 disabled:opacity-50"
                  >
                    {latest ? 'Run the check again' : 'Run eligibility check'}
                  </button>
                </div>

                {latest && <AssessmentView caseId={c.id} assessment={latest} onChanged={load} />}
              </>
            ) : (
              <p className="text-sm text-text-muted mt-2">
                No details about the person in custody were entered, so no check can be run.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};