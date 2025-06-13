//src/components/LandingPage.js

'use client';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function LandingPage({ setUser }) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-light mb-6">closet</h1>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Organize your wardrobe digitally. Upload, categorize, and plan your outfits with AI-powered clothing recognition.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuth(true);
              }}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-8 py-3 border border-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      
      {showAuth && (
        <AuthModal
          mode={authMode}
          setUser={setUser}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}