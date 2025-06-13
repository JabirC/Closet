//src/components/OutfitPlanner.js

'use client';
import { useState } from 'react';

export default function OutfitPlanner({ items, outfits, onCreateOutfit }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');

  const toggleItemSelection = (item) => {
    setSelectedItems(prev => 
      prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const createOutfit = () => {
    if (selectedItems.length > 0 && outfitName.trim()) {
      onCreateOutfit({
        name: outfitName,
        items: selectedItems,
        createdAt: new Date().toISOString()
      });
      setSelectedItems([]);
      setOutfitName('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Item Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Select Items</h3>
        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItemSelection(item)}
              className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                selectedItems.find(i => i.id === item.id)
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-2xl text-gray-400">👔</div>
                )}
              </div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">{item.category}</p>
            </div>
          ))}
        </div>

        {/* Create Outfit */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Outfit name"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
          <button
            onClick={createOutfit}
            disabled={selectedItems.length === 0 || !outfitName.trim()}
            className="w-full bg-black text-white py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            Create Outfit ({selectedItems.length} items)
          </button>
        </div>
      </div>

      {/* Saved Outfits */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Saved Outfits</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {outfits.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-3xl mb-2">✨</div>
              <p>No outfits created yet</p>
            </div>
          ) : (
            outfits.map((outfit) => (
              <div key={outfit.id} className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-800 mb-2">{outfit.name}</h4>
                <div className="flex space-x-2 overflow-x-auto">
                  {outfit.items.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">👔</div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{outfit.items.length} items</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}