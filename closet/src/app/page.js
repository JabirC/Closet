//src/app/page

'use client';
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onShowAuth={() => setShowAuth(true)} />
      )}
      
      {showAuth && (
        <AuthModal 
          onLogin={handleLogin} 
          onClose={() => setShowAuth(false)} 
        />
      )}
    </div>
  );
}