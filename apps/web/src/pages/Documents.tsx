import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Upload } from 'lucide-react';

export const Documents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {t('documents.title') || 'Case Documents'}
          </h1>
          <p className="text-text-secondary">{t('documents.subtitle') || 'Securely view your case related documents.'}</p>
        </div>
        <button className="btn-primary" disabled>
          <Upload className="mr-2" size={18} />
          {t('documents.upload') || 'Upload Document'}
        </button>
      </header>

      {/* Document Gallery Placeholder */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="card p-4 border-dashed border-gray-300">
           <div className="aspect-[3/4] bg-bg-muted rounded mb-3 flex flex-col items-center justify-center text-text-muted text-center p-4">
             <FileText size={40} className="mb-2" />
             <p className="text-sm">Document management API integration is planned for Phase 5.</p>
           </div>
        </div>
        
        <div className="card p-4 hover:border-primary transition-colors">
           <div className="aspect-[3/4] bg-bg-muted rounded mb-3 flex items-center justify-center">
             <FileText className="text-text-muted" size={40} />
           </div>
           <div className="flex justify-between items-start mb-1">
             <span className="text-xs font-bold px-2 py-1 bg-success-bg text-success-text rounded-full">
               {t('documents.verified') || 'Verified'}
             </span>
           </div>
           <h4 className="font-bold text-text-primary truncate">FIR_Copy_124.jpg</h4>
           <p className="text-xs text-text-secondary">Uploaded on Oct 12, 2026</p>
        </div>
      </div>
    </div>
  );
};
