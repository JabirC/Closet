//src/components/AuthModal.js

'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ mode, onClose, onToggleMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (mode === 'register') {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        // Auto sign in after registration
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        });

        if (result?.error) {
          throw new Error('Login after registration failed');
        }

        onClose();
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        });

        if (result?.error) {
          throw new Error('Invalid credentials');
        }

        onClose();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100 animate-slide-up">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">
            {mode === 'login' ? 'Welcome Back' : 'Join Closet'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-2xl hover:scale-110 transition-all duration-200"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-500 transition-all duration-300"
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
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-500 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-500 transition-all duration-300 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 font-semibold text-lg"
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
            onClick={onToggleMode}
            className="text-black hover:text-gray-700 transition-colors text-sm font-medium"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}