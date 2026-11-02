import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import { fetchApi } from '../utils/api';
import {
  FileText,
  MapPin,
  Calendar,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface Case {
  id: string;
  cnrNumber: string | null;
  firNumber: string | null;
  policeStation: string;
  districtId: string;
  status: string;
  createdAt: string;
  assignedLawyer?: {
    id: string;
    phoneNumber: string;
  } | null;
  documents?: unknown[];
}

export const Cases: React.FC = () => {
  const { t } = useLanguage();

  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchApi('/cases/me');
        setCases(data.cases || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load cases');
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-pulse text-text-muted">
          Loading cases...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-error-text">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          {t('cases.title') || 'My Cases'}
        </h1>

        <p className="text-text-secondary">
          {t('cases.subtitle') || 'View and track your registered cases.'}
        </p>
      </header>

      {cases.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />

          <h2 className="text-lg font-medium text-text-primary mb-2">
            No Cases Found
          </h2>

          <p className="text-text-secondary">
            You have not registered any cases yet.
          </p>
        </div>
      ) : (

        <div className="grid gap-4 sm:grid-cols-2">

          {cases.map((c) => {
            const isExpanded = selectedCaseId === c.id;

            return (
              <div
                key={c.id}
                className="card p-5 hover:border-primary transition-colors flex flex-col h-full"
              >

                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      c.status === 'NEW'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-warning-bg text-warning-text'
                    }`}
                  >
                    {c.status.replace('_', ' ')}
                  </span>

                  <span className="text-text-muted text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-text-primary mb-1">
                  {c.firNumber ? `FIR: ${c.firNumber}` : 'Pending FIR'}
                </h3>

                {c.cnrNumber && (
                  <p className="text-sm font-medium text-text-secondary mb-2">
                    CNR: {c.cnrNumber}
                  </p>
                )}

                <div className="mt-2 space-y-2 flex-grow">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <MapPin size={16} className="text-primary/70" />
                    {c.policeStation}
                  </p>

                  {c.assignedLawyer && (
                    <p className="text-sm text-text-secondary flex items-center gap-2">
                      <CheckCircle size={16} className="text-success-text" />
                      Lawyer Assigned
                    </p>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">

                    <h4 className="font-semibold text-text-primary">
                      Case Details
                    </h4>

                    <div className="text-sm space-y-2">
                      <p>
                        <strong>Case ID:</strong> {c.id}
                      </p>

                      <p>
                        <strong>Police Station:</strong> {c.policeStation}
                      </p>

                      <p>
                        <strong>District ID:</strong> {c.districtId}
                      </p>

                      <p>
                        <strong>FIR Number:</strong> {c.firNumber || 'Not available'}
                      </p>

                      <p>
                        <strong>CNR Number:</strong> {c.cnrNumber || 'Not available'}
                      </p>

                      <p>
                        <strong>Status:</strong> {c.status.replace('_', ' ')}
                      </p>

                      <p>
                        <strong>Registered On:</strong>{' '}
                        {new Date(c.createdAt).toLocaleString()}
                      </p>

                      <p>
                        <strong>Documents:</strong> {c.documents?.length ?? 0}
                      </p>

                      <p>
                        <strong>Assigned Lawyer:</strong>{' '}
                        {c.assignedLawyer
                          ? c.assignedLawyer.phoneNumber
                          : 'Not assigned'}
                      </p>
                    </div>

                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCaseId(isExpanded ? null : c.id)
                    }
                    className="btn-primary w-full text-sm py-2 flex items-center justify-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <EyeOff size={16} />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        {t('actions.view_details') || 'View Details'}
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};