//src/components/Sidebar.js

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
    const tabs = [
      { id: 'closet', name: 'Closet', icon: '👗' },
      { id: 'outfits', name: 'Outfits', icon: '✨' },
      { id: 'calendar', name: 'Calendar', icon: '📅' }
    ];
  
    return (
      <div className="w-64 bg-white/80 backdrop-blur-md shadow-xl border-r border-white/20">
        <div className="p-6 border-b border-purple-100">
          <h1 className="text-3xl font-bold text-purple-900">closet</h1>
          <p className="text-sm text-gray-600 mt-2">Hello, {user.name}</p>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-all duration-300 hover:bg-purple-50 hover:scale-105 ${
                activeTab === tab.id 
                  ? 'bg-purple-100 border-r-4 border-purple-900 text-purple-900 font-semibold' 
                  : 'text-gray-700 hover:text-purple-900'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-lg">{tab.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-6 left-6">
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-purple-900 transition-all duration-300 hover:scale-105 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }