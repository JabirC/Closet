// src/components/TopNavigation.js
import { Shirt, Sparkles, Calendar } from 'lucide-react';

export default function TopNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'closet', name: 'Closet', icon: <Shirt className="w-5 h-5" /> },
    { id: 'outfits', name: 'Outfits', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <div className="flex justify-center py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}