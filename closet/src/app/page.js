//src/app/page

'use client';
import { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock check)
    const savedUser = localStorage.getItem('closetUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <Dashboard user={user} setUser={setUser} />
      ) : (
        <LandingPage setUser={setUser} />
      )}
    </div>
  );
}