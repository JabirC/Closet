//src/components/OutfitPlanner.js

'use client';
import { useState } from 'react';

export default function OutfitPlanner({ user, updateUser }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleItemSelection = (item) => {
    setSelectedItems(prev => {
      const isSelected = prev.find(i => i.id === item.id);
      if (isSelected) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const createOutfit = () => {
    if (!outfitName || selectedItems.length === 0) return;
    
    const newOutfit = {
      id: Date.now(),
      name: outfitName,
      items: selectedItems,
      createdAt: new Date().toISOString()
    };
    
    const updatedUser = {
      ...user,
      outfits: [...user.outfits, newOutfit]
    };
    
    updateUser(updatedUser);
    setSelectedItems([]);
    setOutfitName('');
    setShowCreateForm(false);
  };

  const deleteOutfit = (outfitId) => {
    const updatedUser = {
      ...user,
      outfits: user.outfits.filter(outfit => outfit.id !== outfitId)
    };
    updateUser(updatedUser);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">Outfit Planner</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Create Outfit
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Create New Outfit</h2>
          <input
            type="text"
            placeholder="Outfit name"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
            {user.clothes.map(item => (
              <div
                key={item.id}
                onClick={() => toggleItemSelection(item)}
                className={`cursor-pointer rounded-lg overflow-hidden ${
                  selectedItems.find(i => i.id === item.id)
                    ? 'ring-2 ring-gray-900'
                    : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={createOutfit}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save Outfit
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.outfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">{outfit.name}</h3>
              <button
                onClick={() => deleteOutfit(outfit.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {outfit.items.slice(0, 6).map(item => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-square object-cover rounded"
                />
              ))}
              {outfit.items.length > 6 && (
                <div className="bg-gray-100 rounded aspect-square flex items-center justify-center text-gray-600">
                  +{outfit.items.length - 6}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {user.outfits.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-gray-600">No outfits created yet. Start planning your looks!</p>
        </div>
      )}
    </div>
  );
}