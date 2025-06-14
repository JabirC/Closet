//src/components/OutfitPlanner.js

'use client';
import { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

export default function OutfitPlanner({ user, updateUser }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'tops', 'bott', 'shoes', 'accessories', 'outerwear'];
  
  const filteredClothes = selectedCategory === 'all' 
    ? user.clothes 
    : user.clothes.filter(item => item.category === selectedCategory);

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

  const createOutfit = async () => {
    if (!outfitName || selectedItems.length === 0) return;
    
    try {
      const response = await fetch('/api/outfits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: outfitName,
          clothingItemIds: selectedItems.map(item => item.id)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create outfit');
      }

      const { outfit } = await response.json();
      
      const updatedUser = {
        ...user,
        outfits: [...user.outfits, {
          ...outfit,
          items: selectedItems
        }]
      };
      
      updateUser(updatedUser);
      setSelectedItems([]);
      setOutfitName('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating outfit:', error);
    }
  };

  const deleteOutfit = async (outfitId) => {
    try {
      const response = await fetch(`/api/outfits/${outfitId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete outfit');
      }

      const updatedUser = {
        ...user,
        outfits: user.outfits.filter(outfit => outfit.id !== outfitId)
      };
      updateUser(updatedUser);
    } catch (error) {
      console.error('Error deleting outfit:', error);
    }
  };

  return (
    <div className="max-h-screen overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Outfit Planner</h1>
          <p className="text-gray-600 mt-1">Create and manage your outfit combinations</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Create Outfit</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
                Create New Outfit
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setSelectedItems([]);
                  setOutfitName('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter outfit name..."
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            {selectedItems.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Items ({selectedItems.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map(item => (
                    <div key={item.id} className="relative group">
                      <img
                        src={item.imageUrl || item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-black"
                      />
                      <button
                        onClick={() => toggleItemSelection(item)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="flex space-x-2 mb-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6 max-h-96 overflow-y-auto">
              {filteredClothes.map(item => {
                const isSelected = selectedItems.find(i => i.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItemSelection(item)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? 'ring-3 ring-black shadow-lg scale-105'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-2 bg-white">
                      <p className="text-xs text-gray-600 truncate">{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setSelectedItems([]);
                  setOutfitName('');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={createOutfit}
                disabled={!outfitName || selectedItems.length === 0}
                className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Create Outfit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {user.outfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{outfit.name}</h3>
              <button
                onClick={() => deleteOutfit(outfit.id)}
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {outfit.items.slice(0, 6).map(item => (
                <img
                  key={item.id}
                  src={item.imageUrl || item.image}
                  alt={item.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
              {outfit.items.length > 6 && (
                <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-gray-600 text-sm font-medium">
                  +{outfit.items.length - 6}
                </div>
              )}
            </div>
            <div className="mt-3 text-sm text-gray-500">
              {outfit.items.length} item{outfit.items.length !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
      
      {user.outfits.length === 0 && (
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No outfits created yet</h3>
          <p className="text-gray-600 mb-6">Start creating your perfect outfit combinations!</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Create Your First Outfit
          </button>
        </div>
      )}
    </div>
  );
}