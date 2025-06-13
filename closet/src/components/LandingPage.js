//src/components/LandingPage.js

'use client';
import { useState, useEffect, useRef } from 'react';
import AuthModal from './AuthModal';

export default function LandingPage({ setUser }) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Add Montserrat font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const features = [
    {
      icon: '📷',
      title: 'AI-Powered Upload',
      description: 'Simply upload photos and our AI automatically categorizes your clothing items',
      image: '/api/placeholder/400/300'
    },
    {
      icon: '👗',
      title: 'Smart Organization',
      description: 'Keep your wardrobe organized with intelligent tagging and filtering',
      image: '/api/placeholder/400/300'
    },
    {
      icon: '✨',
      title: 'Outfit Planning',
      description: 'Create and save outfit combinations for any occasion',
      image: '/api/placeholder/400/300'
    },
    {
      icon: '📅',
      title: 'Calendar Integration',
      description: 'Plan your outfits in advance with our intuitive calendar view',
      image: '/api/placeholder/400/300'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Blogger',
      content: 'This app has revolutionized how I organize my wardrobe. I never forget what I own anymore!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Busy Professional',
      content: 'Planning outfits has never been easier. I save so much time in the morning now.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Davis',
      role: 'Style Enthusiast',
      content: 'The AI categorization is incredibly accurate. It knows my style better than I do!',
      avatar: '👩‍🎨'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-white/20 animate-fade-in">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-purple-900">closet</div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-700 hover:text-purple-900 transition-colors duration-300">Features</a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-900 transition-colors duration-300">Reviews</a>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuth(true);
              }}
              className="px-6 py-2 text-purple-900 hover:bg-purple-50 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-6 py-2 bg-purple-900 text-white rounded-full hover:bg-purple-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-light mb-8 text-gray-800 animate-slide-up">
            Your Wardrobe,
            <br />
            <span className="text-purple-900 font-medium">Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
            Transform your closet into a smart, organized space with AI-powered clothing recognition and intelligent outfit planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-8 py-4 bg-purple-900 text-white text-lg rounded-full hover:bg-purple-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
            >
              Start Organizing Now
            </button>
            <button className="px-8 py-4 border-2 border-purple-900 text-purple-900 text-lg rounded-full hover:bg-purple-900 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block animate-float">
          <div className="relative">
            <div className="w-64 h-80 bg-white rounded-3xl shadow-2xl p-6 transform rotate-12">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 rounded-2xl flex items-center justify-center">
                <span className="text-6xl">👗</span>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-48 h-64 bg-white rounded-3xl shadow-xl p-4 transform -rotate-12">
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6 text-gray-800">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make wardrobe management effortless and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:shadow-xl group"
                style={{
                  animationDelay: `${index * 200}ms`,
                  transform: `translateY(${scrollY * 0.1}px)`
                }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6 text-gray-800">Loved by Thousands</h2>
            <p className="text-xl text-gray-600">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-purple-900 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-light mb-6">Ready to Transform Your Closet?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of users who've revolutionized their wardrobe management</p>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-8 py-4 bg-white text-purple-900 text-lg rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg font-semibold"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/20">
        <div className="container mx-auto text-center">
          <div className="text-3xl font-bold text-purple-900 mb-4">closet</div>
          <p className="text-gray-600 mb-6">Your intelligent wardrobe companion</p>
          <div className="flex justify-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-purple-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-900 transition-colors">Support</a>
          </div>
        </div>
      </footer>

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