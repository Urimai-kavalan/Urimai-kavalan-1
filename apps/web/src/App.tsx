import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Rights } from './pages/Rights';
import { Documents } from './pages/Documents';
import { LawBot } from './pages/LawBot';
import { Login } from './pages/Login';
import { Cases } from './pages/Cases';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">Urimai Kaavalan</h1>
      <p className="text-lg text-text-secondary mb-8 max-w-md">Protecting Legal Rights Through AI-Assisted Access</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/register" className="btn-primary">Register Case</Link>
        <Link to="/login" className="btn-secondary">Login</Link>
      </div>
    </div>
  );
};

const Register = () => <div className="p-4"><h1 className="text-2xl font-bold">Register Case</h1></div>;
const Profile = () => <div className="p-4"><h1 className="text-2xl font-bold">Profile</h1></div>;
const Settings = () => <div className="p-4"><h1 className="text-2xl font-bold">Settings</h1></div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/rights" element={<ProtectedRoute><Layout><Rights /></Layout></ProtectedRoute>} />
            <Route path="/lawbot" element={<ProtectedRoute><Layout><LawBot /></Layout></ProtectedRoute>} />
            <Route path="/cases" element={<ProtectedRoute><Layout><Cases /></Layout></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Layout><Documents /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />

            <Route path="*" element={<Layout><div className="p-4 text-center"><h1 className="text-2xl font-bold text-error-text">404 - Page Not Found</h1></div></Layout>} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
