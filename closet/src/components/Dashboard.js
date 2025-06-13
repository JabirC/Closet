//src/components/Dashboard.js
'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import VirtualCloset from './VirtualCloset';
import OutfitPlanner from './OutfitPlanner';
import Calendar from './Calendar';
import UploadModal from './UploadModal';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('closet');
  const [showUpload, setShowUpload] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [outfits, setOutfits] = useState([]);

  const addClothingItem = (item) => {
    setClothingItems([...clothingItems, { ...item, id: Date.now() }]);
  };

  const createOutfit = (outfitData) => {
    setOutfits([...outfits, { ...outfitData, id: Date.now() }]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        user={user}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-light text-gray-800">
              {activeTab === 'closet' && 'My Closet'}
              {activeTab === 'outfits' && 'Outfit Planner'}
              {activeTab === 'calendar' && 'Style Calendar'}
            </h1>
            
            {activeTab === 'closet' && (
              <button
                onClick={() => setShowUpload(true)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add Items
              </button>
            )}
          </div>
          
          {activeTab === 'closet' && (
            <VirtualCloset items={clothingItems} />
          )}
          {activeTab === 'outfits' && (
            <OutfitPlanner 
              items={clothingItems} 
              outfits={outfits}
              onCreateOutfit={createOutfit}
            />
          )}
          {activeTab === 'calendar' && (
            <Calendar outfits={outfits} />
          )}
        </div>
      </main>
      
      {showUpload && (
        <UploadModal 
          onClose={() => setShowUpload(false)}
          onAddItem={addClothingItem}
        />
      )}
    </div>
  );
}