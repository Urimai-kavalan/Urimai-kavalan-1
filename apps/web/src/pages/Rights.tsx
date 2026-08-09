import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchApi } from '../utils/api';
import { Scale, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface Right {
  id: string;
  title: string;
  content: string;
  citation: string;
  tags: string[];
}

export const Rights: React.FC = () => {
  const { t, lang } = useLanguage();
  const [rights, setRights] = useState<Right[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const loadRights = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(`/rights?lang=${lang}`);
        setRights(data.rights || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load rights library');
      } finally {
        setLoading(false);
      }
    };
    loadRights();
  }, [lang]);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          {t('rights.title') || 'Legal Rights Library'}
        </h1>
        <p className="text-text-secondary">{t('rights.subtitle') || 'Understand your rights according to Indian Law.'}</p>
      </header>

      {/* Legal Disclaimer Box */}
      <div className="bg-warning-bg border-l-4 border-warning text-warning-text p-4 rounded mb-6 flex items-start">
        <Info className="mr-3 mt-1 flex-shrink-0" size={20} />
        <p className="text-sm font-medium">
          {t('rights.disclaimer') || 'This information is provided for educational purposes and does not constitute legal advice.'}
        </p>
      </div>

      {loading ? (
        <div className="p-8 flex justify-center"><div className="animate-pulse text-text-muted">Loading rights...</div></div>
      ) : error ? (
        <div className="p-8 text-center text-error-text">{error}</div>
      ) : (
        <div className="grid gap-4 mt-6">
          {rights.map((right) => {
            const isExpanded = expandedId === right.id;
            return (
              <div key={right.id} className="card p-5 transition-all">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : right.id)}
                >
                  <div className="flex items-center gap-3">
                    <Scale className="text-primary" size={24} />
                    <h3 className="text-lg font-bold text-text-primary">{right.title}</h3>
                  </div>
                  <button className="text-text-muted hover:text-text-primary">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed whitespace-pre-wrap">
                      {right.content}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Citation: {right.citation}
                      </span>
                      <div className="flex gap-2">
                        {right.tags.map(tag => (
                          <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
