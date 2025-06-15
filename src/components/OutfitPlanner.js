// src/components/OutfitPlanner.js
'use client';
import { useState } from 'react';
import { Plus, X, Sparkles, Trash2 } from 'lucide-react';

export default function OutfitPlanner({ user, updateUser }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
  
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
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting outfit:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create Outfit</span>
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
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
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300"
              />
            </div>

            {selectedItems.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Items ({selectedItems.length})</h3>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                  {selectedItems.map(item => (
                    <div key={item.id} className="relative group">
                      <img
                        src={item.imageUrl || item.image}
                        alt={item.name}
                        className="w-full aspect-square object-cover rounded-lg border-2 border-gray-900"
                      />
                      <button
                        onClick={() => toggleItemSelection(item)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
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
                    className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 mb-6 max-h-80 overflow-y-auto">
              {filteredClothes.map(item => {
                const isSelected = selectedItems.find(i => i.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItemSelection(item)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'ring-3 ring-gray-900 shadow-lg scale-105'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />
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
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createOutfit}
                disabled={!outfitName || selectedItems.length === 0}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Outfit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Outfits Grid - No containers, just grouped items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {user.outfits.map(outfit => (
          <div key={outfit.id} className="outfit-item group relative">
            <div className="mb-3 flex justify-between items-start">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{outfit.name}</h3>
              <button
                onClick={() => setShowDeleteConfirm(outfit.id)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {outfit.items.slice(0, 6).map((item, index) => (
                <img
                  key={item.id}
                  src={item.imageUrl || item.image}
                  alt={item.name}
                  className={`outfit-image w-full aspect-square object-cover rounded-lg transition-all duration-300 ${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                />
              ))}
              {outfit.items.length > 6 && (
                <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-gray-600 text-xs font-medium">
                  +{outfit.items.length - 6}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {user.outfits.length === 0 && (
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No outfits created yet</h3>
          <p className="text-gray-600 mb-6 font-light">Start creating your perfect outfit combinations!</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Create Your First Outfit
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Outfit</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this outfit? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteOutfit(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}