import React from 'react';
import { Loader2, AlertTriangle, FileQuestion } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${fullScreen ? 'min-h-[calc(100vh-64px)]' : 'min-h-[200px]'}`}>
      <Loader2 className="animate-spin text-primary mb-4" size={32} />
      <p className="text-text-secondary font-medium">{message}</p>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Something went wrong', 
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  fullScreen = false
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${fullScreen ? 'min-h-[calc(100vh-64px)]' : 'min-h-[300px]'}`}>
      <div className="bg-error-bg p-4 rounded-full mb-4">
        <AlertTriangle className="text-error-text" size={32} />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary">
          Try Again
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionText,
  onAction,
  icon = <FileQuestion size={40} className="text-text-muted" />
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg border border-gray-200 shadow-sm my-4">
      <div className="bg-bg-muted p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-sm mb-6">{message}</p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
};
