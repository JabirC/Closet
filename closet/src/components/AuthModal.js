//src/components/AuthModal.js

'use client';
import { useState } from 'react';

export default function AuthModal({ mode, setUser, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: Date.now(),
      email,
      name: mode === 'register' ? name : email.split('@')[0],
      clothes: [],
      outfits: [],
      calendar: {}
    };
    
    localStorage.setItem('closetUser', JSON.stringify(user));
    setUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 animate-slide-up">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-light text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {mode === 'login' ? 'Welcome Back' : 'Join Closet'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl hover:scale-110 transition-all duration-200"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-900 text-gray-800 placeholder-gray-500 transition-all duration-300"
                required
              />
            </div>
          )}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-900 text-gray-800 placeholder-gray-500 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-900 text-gray-800 placeholder-gray-500 transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-900 text-white py-4 rounded-2xl hover:bg-purple-800 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 font-semibold text-lg shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button
            onClick={() => window.location.reload()}
            className="text-purple-900 hover:text-purple-700 transition-colors text-sm"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}