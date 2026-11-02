import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scale, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { fetchApi } from '../utils/api';
import { useLanguage } from '../context/useLanguage';

export const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang , setLang } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, password }),
      });
      
      login(data.token, data.user);
      
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || t('app.login_failed') || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base p-4 relative">
  <button
    type="button"
    onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
    className="absolute top-5 right-5 text-sm font-medium border border-primary px-3 py-2 rounded-md text-primary hover:bg-primary hover:text-white transition-colors"
  >
    {lang === 'ta' ? 'English' : 'தமிழ்'}
  </button>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-primary p-6 text-center text-white">
          <div className="flex justify-center mb-4">
            <Scale size={48} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <p className="text-primary-light mt-2 text-sm">{t('app.subtitle')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-error-bg text-error-text text-sm p-3 rounded border border-error-text/20">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {t('login.phone') || 'Phone Number'}
            </label>
            <input
              type="text"
              required
              className="input-field w-full"
              placeholder="e.g. 9999999999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {t('login.password') || 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="input-field w-full pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            {loading ? '...' : (t('actions.login') || 'Login')}
          </button>
        </form>
      </div>
    </div>
  );
};
