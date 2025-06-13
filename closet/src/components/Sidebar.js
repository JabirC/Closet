//src/components/Sidebar.js

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
    const tabs = [
      { id: 'closet', name: 'Closet', icon: '👗' },
      { id: 'upload', name: 'Upload', icon: '📷' },
      { id: 'outfits', name: 'Outfits', icon: '✨' },
      { id: 'calendar', name: 'Calendar', icon: '📅' }
    ];
  
    return (
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-light">closet</h1>
          <p className="text-sm text-gray-600 mt-1">Hello, {user.name}</p>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                activeTab === tab.id ? 'bg-gray-100 border-r-2 border-gray-900' : ''
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-6 left-6">
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }