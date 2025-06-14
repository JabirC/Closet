//src/components/ClothingDrawer

'use client';
import { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function ClothingDrawer({ user, updateUser }) {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
  
  const filteredClothes = selectedCategory === 'all' 
    ? user.clothes 
    : user.clothes.filter(item => item.category === selectedCategory);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setError('');
    
    try {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const imageUrl = event.target.result;
          
          // Create clothing item
          const response = await fetch('/api/clothes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name.split('.')[0] || 'New Item',
              category: mockAIClassification(),
              tags: mockAITags(),
              imageUrl: imageUrl
            })
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Upload failed');
          }

          const { clothingItem } = await response.json();
          
          // Update local state
          const updatedUser = {
            ...user,
            clothes: [...user.clothes, clothingItem],
            uploadCount: (user.uploadCount || 0) + 1
          };
          
          updateUser(updatedUser);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setShowUpload(false);
    }
  };

  const mockAIClassification = () => {
    const categories = ['tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const mockAITags = () => {
    const allTags = ['casual', 'formal', 'summer', 'winter', 'cotton', 'denim', 'leather'];
    return allTags.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`/api/clothes/${itemId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      const updatedUser = {
        ...user,
        clothes: user.clothes.filter(item => item.id !== itemId)
      };
      updateUser(updatedUser);
    } catch (error) {
      setError('Failed to delete item');
    }
  };

  const uploadLimit = user.tier === 'free' ? 10 : 100;
  const canUpload = (user.uploadCount || 0) < uploadLimit;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light">Your Closet</h1>
          <p className="text-gray-600 mt-2">
            {user.uploadCount || 0} of {uploadLimit} items uploaded
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          disabled={!canUpload}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
            canUpload 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Photos</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
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
                src={item.imageUrl || item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
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

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Upload Photos</h2>
              <button onClick={() => setShowUpload(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {!canUpload && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  You've reached your upload limit. Upgrade to Premium for more uploads.
                </p>
              </div>
            )}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Our AI will automatically detect and categorize your items
              </p>
              
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={uploading || !canUpload}
              />
              <label
                htmlFor="file-upload"
                className={`inline-block px-6 py-3 rounded-lg cursor-pointer transition-colors ${
                  uploading || !canUpload
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {uploading ? 'Processing...' : 'Choose Photos'}
              </label>
            </div>
            
            {uploading && (
              <div className="mt-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">AI is processing your images...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}