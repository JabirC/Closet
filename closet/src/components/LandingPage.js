//src/components/LandingPage.js

'use client';
import { useState, useEffect, useRef } from 'react';
import AuthModal from './AuthModal';

export default function LandingPage({ setUser }) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Add Inter font for modern, playful look
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const features = [
    {
      icon: '🔍',
      title: 'Smart Recognition',
      description: 'AI instantly identifies and categorizes your clothing items from photos',
      color: 'from-blue-400/20 to-cyan-400/20'
    },
    {
      icon: '🎨',
      title: 'Style Intelligence',
      description: 'Get personalized outfit suggestions based on your style preferences',
      color: 'from-orange-400/20 to-red-400/20'
    },
    {
      icon: '📱',
      title: 'Digital Wardrobe',
      description: 'Access your entire closet from anywhere, anytime on any device',
      color: 'from-yellow-400/20 to-orange-400/20'
    },
    {
      icon: '⚡',
      title: 'Quick Planning',
      description: 'Create and schedule outfits in seconds with our intuitive interface',
      color: 'from-cyan-400/20 to-blue-400/20'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Creative Director',
      content: 'This app transformed how I approach my daily style. The AI suggestions are spot-on!',
      avatar: '🧑‍💼'
    },
    {
      name: 'Jordan Lee',
      role: 'Software Engineer',
      content: 'Finally, a wardrobe app that understands minimalist style. Clean and efficient.',
      avatar: '👩‍💻'
    },
    {
      name: 'Sam Chen',
      role: 'Fashion Student',
      content: 'The outfit planning feature saves me hours every week. Absolutely love it!',
      avatar: '🎓'
    }
  ];

  const handleAuthToggle = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/30 relative overflow-hidden"
      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            top: '60%',
            right: '10%'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-red-400/10 to-orange-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            bottom: '20%',
            left: '30%'
          }}
        />
      </div>

      {/* Modern Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-white/20 animate-slide-down">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            closet
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-slate-700 hover:text-blue-600 transition-all duration-300 cursor-pointer font-medium">Features</a>
            <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-all duration-300 cursor-pointer font-medium">Reviews</a>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 px-4 relative"
      >
        <div className="container mx-auto text-center relative z-10">
          <div 
            className="inline-block mb-6 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-slate-600 border border-white/20"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)`,
              opacity: Math.max(1 - scrollY * 0.002, 0)
            }}
          >
            ✨ Your Digital Wardrobe Revolution
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent leading-tight animate-slide-up"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.2, 50)}px)`,
              opacity: Math.max(1 - scrollY * 0.003, 0)
            }}
          >
            Style Made
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Simple
            </span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-12 text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay font-medium"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.15, 40)}px)`,
              opacity: Math.max(1 - scrollY * 0.0025, 0)
            }}
          >
            Transform your closet into an intelligent wardrobe with AI-powered organization and effortless outfit planning.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.1, 30)}px)`,
              opacity: Math.max(1 - scrollY * 0.002, 0)
            }}
          >
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 font-semibold cursor-pointer"
            >
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-white/70 backdrop-blur-sm text-slate-700 text-lg rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer font-semibold">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Modern Hero Visual */}
        <div 
          className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block"
          style={{
            transform: `translateY(${-50 + scrollY * 0.3}%) translateX(${mousePosition.x * 0.01}px)`
          }}
        >
          <div className="relative animate-float-modern">
            <div className="w-72 h-96 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20">
              <div className="w-full h-full bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-2xl flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl animate-bounce-slow">👔</div>
                <div className="text-2xl">✨</div>
                <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Stagger Animation */}
      <section 
        id="features" 
        ref={featuresRef} 
        className="py-20 px-4 relative"
        style={{
          transform: `translateY(${Math.max(scrollY * -0.1, -50)}px)`
        }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent animate-fade-in-up">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Powerful features designed to revolutionize how you manage your style
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${feature.color} backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 border border-white/20 shadow-lg hover:shadow-xl cursor-pointer`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  transform: `translateY(${Math.max((scrollY - 300) * -0.05, -20)}px)`
                }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Modern Cards */}
      <section id="testimonials" className="py-20 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
              Loved Worldwide
            </h2>
            <p className="text-xl text-slate-600 font-medium">Join thousands who've transformed their style</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 cursor-pointer"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-slate-600 mb-6 italic font-medium">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-slate-800">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm font-medium">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Style?</h2>
            <p className="text-xl mb-8 opacity-90 font-medium">Join the style revolution today</p>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="px-8 py-4 bg-white text-blue-600 text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg font-bold cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/20">
        <div className="container mx-auto text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            closet
          </div>
          <p className="text-slate-600 mb-6 font-medium">Your intelligent style companion</p>
          <div className="flex justify-center space-x-8 text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer font-medium">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer font-medium">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer font-medium">Support</a>
          </div>
        </div>
      </footer>

      {showAuth && (
        <AuthModal
          mode={authMode}
          setUser={setUser}
          onClose={() => setShowAuth(false)}
          onToggleMode={handleAuthToggle}
        />
      )}
    </div>
  );
}