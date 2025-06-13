//src/components/LandingPage.js

export default function LandingPage({ onShowAuth }) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-light text-gray-800 mb-6">closet</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Organize your wardrobe digitally. Upload photos, create outfits, and plan your style.
          </p>
          <div className="space-x-4">
            <button 
              onClick={onShowAuth}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }