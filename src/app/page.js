//src/app/page
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-black mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-600">Loading your wardrobe...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {session?.user ? (
        <Dashboard user={session.user} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}