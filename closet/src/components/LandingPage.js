// src/components/LandingPage.js
'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Sparkles, Zap, Calendar, Shield } from 'lucide-react';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const words = ['Reimagined', 'Organized', 'Simplified', 'Digitized', 'Personalized'];

  // Flowing word transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      if (isLogin) {
        const result = await signIn('credentials', { 
          email, 
          password, 
          redirect: false 
        });
        
        if (result?.error) {
          setAuthError('Invalid email or password');
        }
      } else {
        const name = formData.get('name');
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (!response.ok) {
          setAuthError(data.error || 'Registration failed');
        } else {
          const result = await signIn('credentials', { 
            email, 
            password, 
            redirect: false 
          });
          
          if (result?.error) {
            setAuthError('Registration successful but login failed');
          }
        }
      }
    } catch (error) {
      setAuthError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dreamy Gradient Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-violet-200/40 via-purple-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200/40 via-pink-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/40 via-violet-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-transparent to-blue-50/20"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Your Closet,
                <br />
                <span className="relative inline-block overflow-hidden">
                  <span 
                    key={currentWordIndex}
                    className="inline-block animate-slide-up dreamy-gradient-text"
                    style={{
                      animationDelay: '0s',
                      animationDuration: '0.8s'
                    }}
                  >
                    {words[currentWordIndex]}
                  </span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-12 max-w-lg mx-auto lg:mx-0 animate-slide-up-delay leading-relaxed">
                Transform your wardrobe management with AI-powered organization, 
                smart outfit planning, and digital styling assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-slide-up-delay-2">
                <button className="group relative px-10 py-5 bg-gray-900 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer text-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 transition-colors duration-300">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button className="group px-10 py-5 border-2 border-gray-300 text-gray-900 font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 cursor-pointer text-lg">
                  <span className="group-hover:text-purple-600 transition-colors duration-300">Learn More</span>
                </button>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up-delay-2">
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-700 text-sm font-medium">AI Recognition</p>
                <p className="text-gray-500 text-xs mt-1">Smart categorization</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-700 text-sm font-medium">Smart Outfits</p>
                <p className="text-gray-500 text-xs mt-1">Instant combinations</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-700 text-sm font-medium">Calendar Planning</p>
                <p className="text-gray-500 text-xs mt-1">Weekly organization</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="animate-slide-up-delay">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600 text-lg">
                  {isLogin ? 'Sign in to your digital closet' : 'Start organizing your wardrobe'}
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    {authError}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-lg"
                    />
                  </div>
                )}
                
                <div className="group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-lg"
                  />
                </div>
                
                <div className="group">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 bg-gray-900 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden cursor-pointer text-lg disabled:opacity-50 disabled:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 transition-colors duration-300 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </span>
                </button>
              </form>

              <p className="text-center text-gray-600 mt-8 text-lg">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setAuthError('');
                  }}
                  className="ml-2 text-purple-600 hover:text-purple-700 font-bold transition-colors duration-300 hover:underline cursor-pointer"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}