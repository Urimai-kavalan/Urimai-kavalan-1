import { useState } from 'react';
import { fetchApi } from './utils/api';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { useLanguage } from './context/useLanguage';

import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Dashboard } from './pages/Dashboard';
import { Rights } from './pages/Rights';
import { Documents } from './pages/Documents';
import { LawBot } from './pages/LawBot';
import { Login } from './pages/Login';
import { Cases } from './pages/Cases';

// Landing Page
const Landing = () => {
  const { isAuthenticated } = useAuth();
  const { lang, setLang, t } = useLanguage();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center">

      {/* Language Switch */}
      <button
        onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
        className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-md"
      >
        {lang === 'ta' ? 'English' : 'தமிழ்'}
      </button>

      {/* Landing Content */}
      <h1 className="text-3xl font-bold text-primary mb-4">
        {t('app.title')}
      </h1>

      <p className="text-lg text-text-secondary mb-8 max-w-md">
        {t('app.subtitle')}
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">

        <Link to="/register" className="btn-primary">
          {lang === 'ta' ? 'வழக்கைப் பதிவு செய்' : 'Register Case'}
        </Link>

        <Link to="/login" className="btn-secondary">
          {t('actions.login')}
        </Link>

      </div>
    </div>
  );
};

// Register Page
const Register = () => {
  const { lang } = useLanguage();

  const [policeStation, setPoliceStation] = useState('');
  const [districtId, setDistrictId] = useState('chennai-01');
  const [firNumber, setFirNumber] = useState('');
  const [cnrNumber, setCnrNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isTamil = lang === 'ta';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    try {
      await fetchApi('/cases', {
        method: 'POST',
        body: JSON.stringify({
          policeStation: policeStation.trim(),
          districtId: districtId.trim(),
          firNumber: firNumber.trim() || undefined,
          cnrNumber: cnrNumber.trim() || undefined,
        }),
      });

      setMessage(
        isTamil
          ? 'வழக்கு வெற்றிகரமாக பதிவு செய்யப்பட்டது!'
          : 'Case registered successfully!'
      );

      setPoliceStation('');
      setFirNumber('');
      setCnrNumber('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isTamil
            ? 'வழக்கைப் பதிவு செய்ய முடியவில்லை.'
            : 'Unable to register case.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-2">
        {isTamil ? 'வழக்கைப் பதிவு செய்க' : 'Register Case'}
      </h1>

      <p className="text-text-secondary mb-6">
        {isTamil
          ? 'கீழே உள்ள வழக்கு விவரங்களை உள்ளிடவும்.'
          : 'Enter the case details below.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-medium mb-2">
            {isTamil ? 'காவல் நிலையம்' : 'Police Station'} *
          </label>
          <input
            type="text"
            value={policeStation}
            onChange={(e) => setPoliceStation(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
            placeholder={
              isTamil ? 'காவல் நிலையத்தின் பெயர்' : 'Enter police station'
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            {isTamil ? 'மாவட்ட ID' : 'District ID'} *
          </label>
          <input
            type="text"
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
            placeholder="chennai-01"
          />
          <p className="text-sm text-text-secondary mt-1">
            {isTamil
              ? 'உங்கள் மாவட்டத்திற்கான சரியான ID-ஐ உள்ளிடவும்.'
              : 'Enter the district ID configured by the project.'}
          </p>
        </div>

        <div>
          <label className="block font-medium mb-2">
            {isTamil ? 'FIR எண்' : 'FIR Number'}
          </label>
          <input
            type="text"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            {isTamil ? 'CNR எண்' : 'CNR Number'}
          </label>
          <input
            type="text"
            value={cnrNumber}
            onChange={(e) => setCnrNumber(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Optional"
          />
        </div>

        {message && (
          <p className="text-green-700 font-medium" role="status">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50"
        >
          {loading
            ? isTamil ? 'பதிவு செய்கிறது...' : 'Submitting...'
            : isTamil ? 'வழக்கைப் பதிவு செய்' : 'Submit Case'}
        </button>

        <Link
          to="/cases"
          className="block text-center text-primary underline"
        >
          {isTamil ? 'வழக்குகளைக் காண்க' : 'View My Cases'}
        </Link>

      </form>
    </div>
  );
};

// Profile Page
// Profile Page
const Profile = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const isTamil = lang === 'ta';

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {isTamil ? 'எனது சுயவிவரம்' : 'My Profile'}
        </h1>
        <p className="text-text-secondary mt-1">
          {isTamil
            ? 'உங்கள் கணக்கு விவரங்கள்'
            : 'View your account information.'}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-primary flex items-center justify-center text-2xl font-bold">
            {user.phoneNumber.slice(-1)}
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary">
              {isTamil ? 'கணக்கு விவரங்கள்' : 'Account Information'}
            </h2>
            <p className="text-sm text-text-secondary">
              {isTamil ? 'சரிபார்க்கப்பட்ட பயனர் கணக்கு' : 'Authenticated user account'}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-text-secondary">
              {isTamil ? 'பயனர் ID' : 'User ID'}
            </p>
            <p className="font-medium text-text-primary break-all">
              {user.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-text-secondary">
              {isTamil ? 'தொலைபேசி எண்' : 'Phone Number'}
            </p>
            <p className="font-medium text-text-primary">
              {user.phoneNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-text-secondary">
              {isTamil ? 'கணக்கு வகை' : 'Account Role'}
            </p>
            <p className="font-medium text-text-primary">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Page
const Settings = () => {
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();

  const isTamil = lang === 'ta';

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-2">
        {isTamil ? 'அமைப்புகள்' : 'Settings'}
      </h1>

      <p className="text-text-secondary mb-6">
        {isTamil
          ? 'உங்கள் கணக்கு மற்றும் பயன்பாட்டு விருப்பங்களை நிர்வகிக்கவும்.'
          : 'Manage your account and application preferences.'}
      </p>

      <div className="bg-white border rounded-xl p-5 mb-5">
        <h2 className="font-semibold text-lg mb-4">
          {isTamil ? 'மொழி விருப்பம்' : 'Language Preference'}
        </h2>

        <p className="text-sm text-text-secondary mb-4">
          {isTamil ? 'பயன்பாட்டு மொழியைத் தேர்ந்தெடுக்கவும்.' : 'Choose your application language.'}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setLang('en')}
            className={`px-5 py-2 rounded-lg border ${
              lang === 'en' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            English
          </button>

          <button
            onClick={() => setLang('ta')}
            className={`px-5 py-2 rounded-lg border ${
              lang === 'ta' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-5">
        <h2 className="font-semibold text-lg mb-4">
          {isTamil ? 'கணக்கு விவரங்கள்' : 'Account Details'}
        </h2>

        <p className="text-sm text-text-secondary">Phone Number</p>
        <p className="font-medium mb-3">{user?.phoneNumber || 'N/A'}</p>

        <p className="text-sm text-text-secondary">Account Role</p>
        <p className="font-medium">{user?.role || 'N/A'}</p>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
      >
        {isTamil ? 'வெளியேறு' : 'Logout'}
      </button>
    </div>
  );
};

// Main App
function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            

            {/* Protected Routes */}
            <Route
  path="/register"
  element={
    <ProtectedRoute>
      <Layout>
        <Register />
      </Layout>
    </ProtectedRoute>
  }
/>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/rights"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Rights />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/lawbot"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LawBot />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/cases"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Cases />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Documents />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <Layout>
                  <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-error-text">
                      404 - Page Not Found
                    </h1>
                  </div>
                </Layout>
              }
            />

          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;