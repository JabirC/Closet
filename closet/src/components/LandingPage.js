// src/components/LandingPage.js
'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const words = ['Reimagined', 'Organized', 'Simplified', 'Digitized', 'Personalized'];

  useEffect(() => {
    if (isWaiting) return;

    const typeSpeed = isDeleting ? 75 : 120;
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsWaiting(false);
        }, 2500); // Wait 2.5 seconds before deleting
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(prev => 
          isDeleting 
            ? prev.slice(0, -1)
            : currentWord.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, isWaiting]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (isLogin) {
      await signIn('credentials', { email, password, callbackUrl: '/' });
    } else {
      const name = formData.get('name');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        await signIn('credentials', { email, password, callbackUrl: '/' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 grid-bg overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your Closet,
                <br />
                <span className="flowing-gradient-text inline-block">
                  {currentText}
                  <span className={`inline-block w-1 h-16 bg-black ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up-delay">
                Transform your wardrobe management with AI-powered organization, 
                smart outfit planning, and digital styling assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up-delay-2">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer">
                  <span className="group-hover:text-blue-300 transition-colors duration-300">Learn More</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="animate-slide-up-delay">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-300">
                  {isLogin ? 'Sign in to your digital closet' : 'Start organizing your wardrobe'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                    />
                  </div>
                )}
                
                <div className="group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  />
                </div>
                
                <div className="group">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </span>
                </button>
              </form>

              <p className="text-center text-gray-300 mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline cursor-pointer"
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