//src/components/Sidebar.js
import { Shirt, Sparkles, Calendar, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const tabs = [
    { id: 'closet', name: 'Closet', icon: <Shirt className="w-5 h-5" /> },
    { id: 'outfits', name: 'Outfits', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <div className="w-72 bg-white shadow-xl border-r border-gray-200">
      <div className="p-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-black tracking-tight" style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          closet
        </h1>
        <p className="text-sm text-gray-600 mt-2">Welcome back, {user.name}</p>
      </div>
      
      <nav className="mt-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-8 py-4 flex items-center space-x-3 transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-gray-100 border-r-4 border-black text-black font-semibold' 
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            <span className="text-lg">{tab.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-8 left-8">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}