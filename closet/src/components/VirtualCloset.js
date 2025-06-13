//src/components/VirtualCloset.js

'use client';
import { useState } from 'react';

export default function VirtualCloset({ items }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="h-full">
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Virtual Drawers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 h-full overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">👕</div>
              <p>No items yet. Start by adding some clothes!</p>
            </div>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl text-gray-400">👔</div>
                )}
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <div className="flex flex-wrap gap-1">
                {item.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}