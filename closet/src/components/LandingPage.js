//src/components/LandingPage.js

'use client';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { 
  Sparkles, 
  Zap, 
  Scan, 
  Calendar, 
  Smartphone, 
  ArrowRight,
  Play,
  Check
} from 'lucide-react';

export default function LandingPage({ setUser }) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const fullText = "Your Wardrobe, Reimagined";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setTypewriterComplete(true), 500);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Scan className="w-8 h-8" />,
      title: 'AI Recognition',
      description: 'Instantly identify and categorize your clothing with advanced AI technology'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Smart Styling',
      description: 'Get personalized outfit recommendations based on weather, occasion, and style'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Digital Closet',
      description: 'Access your entire wardrobe from anywhere with cloud synchronization'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Outfit Planning',
      description: 'Schedule outfits in advance and never worry about what to wear'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 grid-bg opacity-50"></div>
      
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-12">
          <div className="text-2xl font-bold text-black tracking-tight" style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
            closet
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-black transition-colors font-medium">Features</a>
            <a href="#demo" className="text-gray-700 hover:text-black transition-colors font-medium">Demo</a>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Powered by Advanced AI</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className={`${typewriterComplete ? 'text-black' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'}`}>
                    {typewriterText}
                    {!typewriterComplete && <span className="animate-blink">|</span>}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Transform your closet into an intelligent wardrobe with AI-powered organization and effortless style planning.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setShowAuth(true);
                  }}
                  className="group px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold flex items-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-all duration-300 font-semibold flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl animate-float-gentle">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div
                      key={item}
                      className="aspect-square bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl animate-glow"
                      style={{ animationDelay: `${item * 0.2}s` }}
                    >
                      {item % 3 === 0 ? '👔' : item % 2 === 0 ? '👗' : '👟'}
                    </div>
                  ))}
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-500 text-white rounded-full p-3 animate-pulse">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI features designed to revolutionize your style management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-blue-500 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands who've already transformed their style
            </p>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {showAuth && (
        <AuthModal
          mode={authMode}
          setUser={setUser}
          onClose={() => setShowAuth(false)}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      )}
    </div>
  );
}