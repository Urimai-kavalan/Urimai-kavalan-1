import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { fetchApi } from '../utils/api';
import { useLanguage } from '../context/useLanguage';

const TEXT = {
  en: {
    title: 'Create your account',
    confirm: 'Confirm password',
    submit: 'Sign up',
    haveAccount: 'Already have an account?',
    badPhone: 'Enter a valid 10-digit mobile number',
    shortPassword: 'Password must be at least 8 characters',
    mismatch: 'Passwords do not match',
    taken: 'This phone number is already registered',
    failed: 'Sign up failed. Please try again.',
  },
  ta: {
    title: 'கணக்கை உருவாக்குங்கள்',
    confirm: 'கடவுச்சொல்லை உறுதிப்படுத்துக',
    submit: 'பதிவு செய்க',
    haveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    badPhone: 'சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்',
    shortPassword: 'கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்',
    mismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
    taken: 'இந்த எண் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது',
    failed: 'பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.',
  },
};

export const Signup: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const text = TEXT[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Same rules as the server, checked first so the message is in the user's language
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) return setError(text.badPhone);
    if (password.length < 8) return setError(text.shortPassword);
    if (password !== confirmPassword) return setError(text.mismatch);

    setLoading(true);
    try {
      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, password, languagePref: lang }),
      });

      login(data.token, data.user);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      const message: string = err?.message ?? '';
      setError(message.includes('already registered') ? text.taken : text.failed);
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
          <p className="text-primary-light mt-2 text-sm">{text.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-error-bg text-error-text text-sm p-3 rounded border border-error-text/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {t('login.phone')}
            </label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              required
              className="input-field w-full"
              placeholder="e.g. 9999999999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {t('login.password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="input-field w-full pr-10"
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

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {text.confirm}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="input-field w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
            {loading ? '...' : text.submit}
          </button>

          <p className="text-center text-sm text-text-secondary">
            {text.haveAccount}{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {t('actions.login')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};