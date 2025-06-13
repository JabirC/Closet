//src/components/ClothingDrawer

'use client';
import { useState } from 'react';

export default function ClothingDrawer({ user, updateUser }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
  
  const filteredClothes = selectedCategory === 'all' 
    ? user.clothes 
    : user.clothes.filter(item => item.category === selectedCategory);

  const deleteItem = (itemId) => {
    const updatedUser = {
      ...user,
      clothes: user.clothes.filter(item => item.id !== itemId)
    };
    updateUser(updatedUser);
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Your Closet</h1>
      
      <div className="mb-6">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredClothes.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="aspect-square relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-xs text-gray-600 capitalize">{item.category}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClothes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👗</div>
          <p className="text-gray-600">No items found. Start by uploading some clothes!</p>
        </div>
      )}
    </div>
  );
}