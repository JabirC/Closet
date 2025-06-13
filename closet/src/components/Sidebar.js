//src/components/Sidebar.js

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
    const tabs = [
      { id: 'closet', name: 'Closet', icon: '👔' },
      { id: 'outfits', name: 'Outfits', icon: '✨' },
      { id: 'calendar', name: 'Calendar', icon: '📅' }
    ];
  
    return (
      <div className="w-64 bg-white/80 backdrop-blur-xl shadow-xl border-r border-white/20">
        <div className="p-6 border-b border-blue-100">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            closet
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-medium">Hello, {user.name}</p>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-blue-100 border-r-4 border-blue-600 text-blue-700 font-semibold' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-lg font-medium">{tab.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-6 left-6">
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium cursor-pointer"
          >
            <span className="text-lg">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }