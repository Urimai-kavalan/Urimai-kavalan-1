import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Scale, MessageSquare, Bell, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, setLang, t } = useLanguage();
  const { logout, user } = useAuth();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'nav.home' },
    { path: '/cases', icon: FileText, label: 'nav.cases' },
    { path: '/documents', icon: FileText, label: 'nav.documents' },
    { path: '/rights', icon: Scale, label: 'nav.rights' },
    { path: '/lawbot', icon: MessageSquare, label: 'nav.ai_assistant' },
  ];

  const closeMenus = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      {/* Header */}
      <header className="bg-primary text-white h-16 flex items-center justify-between px-4 sticky top-0 z-20 shadow-sm">
        <div className="font-bold text-lg flex items-center gap-2">
          <button className="sm:hidden mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Scale size={24} className="hidden sm:block" />
          {t('app.title')}
        </div>
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
            className="text-sm font-medium hover:bg-white/10 border border-white/30 px-2 py-1 rounded transition-colors"
          >
            {lang === 'ta' ? 'English' : 'தமிழ்'}
          </button>
          <button className="hover:bg-white/10 p-1 rounded transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:bg-white/10 p-1 rounded transition-colors flex items-center gap-2"
            >
              <User size={20} />
              <span className="hidden sm:inline text-sm font-medium">{user?.phoneNumber}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-text-primary border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100 text-sm text-text-secondary truncate">
                  Logged in as <br/><strong className="text-text-primary">{user?.phoneNumber}</strong>
                </div>
                <Link to="/profile" onClick={closeMenus} className="block px-4 py-2 text-sm hover:bg-bg-muted flex items-center gap-2">
                  <User size={16} /> {t('actions.profile') || 'Profile'}
                </Link>
                <Link to="/settings" onClick={closeMenus} className="block px-4 py-2 text-sm hover:bg-bg-muted flex items-center gap-2">
                  <Settings size={16} /> {t('actions.settings') || 'Settings'}
                </Link>
                <button 
                  onClick={() => { closeMenus(); logout(); }}
                  className="w-full text-left px-4 py-2 text-sm text-error-text hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} /> {t('actions.logout') || 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden sm:flex w-64 flex-col bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="flex-1 p-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-bg-muted hover:text-primary'}`}
                >
                  <item.icon size={20} className={isActive ? 'text-primary' : ''} /> 
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute inset-0 z-10 flex">
            <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto shadow-xl">
              <nav className="p-4 flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      onClick={closeMenus}
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-bg-muted hover:text-primary'}`}
                    >
                      <item.icon size={20} className={isActive ? 'text-primary' : ''} /> 
                      {t(item.label)}
                    </Link>
                  );
                })}
              </nav>
            </aside>
            <div className="flex-1 bg-black/20" onClick={closeMenus}></div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16 sm:pb-0" onClick={() => { if(profileOpen) setProfileOpen(false); }}>
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex items-center justify-around h-16 pb-safe z-20 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
            >
              <item.icon size={20} className={isActive ? 'text-primary' : ''} />
              <span className="text-[10px] mt-1 font-medium truncate max-w-[80%]">{t(item.label)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
