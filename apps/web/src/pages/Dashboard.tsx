import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PlusCircle, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          {t('dashboard.title')}
        </h1>
        <p className="text-text-secondary">{t('dashboard.subtitle')}</p>
      </header>

      {/* Primary Action */}
      <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">{t('dashboard.need_aid')}</h2>
            <p className="text-sm text-text-secondary mb-4">
              {t('dashboard.register_desc')}
            </p>
            <Link to="/register" className="btn-primary">
              <PlusCircle className="mr-2" size={18} />
              {t('actions.register')}
            </Link>
          </div>
        </div>
      </section>

      {/* Active Cases (Mock) */}
      <section>
        <h3 className="text-lg font-bold text-text-primary mb-4">{t('dashboard.active_cases')}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Card Component from Design System */}
          <div className="card p-4 hover:border-primary transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-warning-bg text-warning-text rounded-full">
                {t('dashboard.status_pending')}
              </span>
              <span className="text-text-muted text-xs">{t('dashboard.today')}</span>
            </div>
            <h4 className="font-bold text-text-primary mb-1">FIR: 124/2026</h4>
            <p className="text-sm text-text-secondary">Chennai Central Police Station</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
              <button className="text-primary text-sm font-medium hover:underline flex items-center">
                <FileText size={16} className="mr-1" /> {t('actions.view_details')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-8">
         <Link to="/rights" className="flex flex-col items-center p-4 bg-bg-surface rounded-lg border border-gray-200 hover:bg-bg-muted transition-colors text-center">
            <Search className="text-secondary mb-2" size={24} />
            <span className="text-sm font-medium">{t('nav.rights')}</span>
         </Link>
      </section>

    </div>
  );
};
