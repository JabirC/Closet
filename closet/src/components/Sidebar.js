//src/components/Sidebar.js

export default function Sidebar({ activeTab, setActiveTab, onLogout, user }) {
    const tabs = [
      { id: 'closet', name: 'My Closet', icon: '👔' },
      { id: 'outfits', name: 'Outfits', icon: '✨' },
      { id: 'calendar', name: 'Calendar', icon: '📅' }
    ];
  
    return (
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-light text-gray-800">closet</h2>
          <p className="text-sm text-gray-600 mt-1">Hello, {user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }