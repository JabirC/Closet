// src/components/ClothingDrawer.js
'use client';
import { useState } from 'react';
import { Upload, X, AlertCircle, Trash2 } from 'lucide-react';

export default function ClothingDrawer({ user, updateUser }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [pendingUploads, setPendingUploads] = useState([]);
  
  const categories = ['all', 'tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
  
  const filteredClothes = selectedCategory === 'all' 
    ? user.clothes 
    : user.clothes.filter(item => item.category === selectedCategory);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploads = files.map(file => ({
      id: Math.random().toString(),
      file,
      name: file.name.split('.')[0] || 'New Item',
      category: 'tops',
      imageUrl: URL.createObjectURL(file)
    }));

    setPendingUploads(uploads);
  };

  const updatePendingUpload = (id, field, value) => {
    setPendingUploads(prev => 
      prev.map(upload => 
        upload.id === id ? { ...upload, [field]: value } : upload
      )
    );
  };

  const confirmUploads = async () => {
    setUploading(true);
    setError('');
    
    try {
      for (const upload of pendingUploads) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const imageUrl = event.target.result;
          
          const response = await fetch('/api/clothes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: upload.name,
              category: upload.category,
              tags: [],
              imageUrl: imageUrl
            })
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Upload failed');
          }

          const { clothingItem } = await response.json();
          
          const updatedUser = {
            ...user,
            clothes: [...user.clothes, clothingItem],
            uploadCount: (user.uploadCount || 0) + 1
          };
          
          updateUser(updatedUser);
        };
        reader.readAsDataURL(upload.file);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setShowUpload(false);
      setPendingUploads([]);
    }
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
      setShowDeleteConfirm(null);
    } catch (error) {
      setError('Failed to delete item');
    }
  };

  const uploadLimit = user.tier === 'free' ? 10 : 100;
  const canUpload = (user.uploadCount || 0) < uploadLimit;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Your Closet</h1>
          <p className="text-gray-600 mt-2 font-light">
            {user.uploadCount || 0} of {uploadLimit} items uploaded
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          disabled={!canUpload}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
            canUpload 
              ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Photos</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl capitalize transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredClothes.map(item => (
          <div key={item.id} className="group relative">
            <div className="aspect-square relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <img
                src={item.imageUrl || item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowDeleteConfirm(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClothes.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👗</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 font-light">Start by uploading some clothes!</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upload Photos</h2>
              <button 
                onClick={() => {
                  setShowUpload(false);
                  setPendingUploads([]);
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {!canUpload && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-yellow-800 text-sm font-medium">
                  You've reached your upload limit. Upgrade to Premium for more uploads.
                </p>
              </div>
            )}

            {pendingUploads.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4 font-medium">
                  Choose photos to upload
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
                  className={`inline-block px-6 py-3 rounded-xl cursor-pointer transition-colors ${
                    uploading || !canUpload
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Choose Photos
                </label>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">Label your items</h3>
                <div className="space-y-4 mb-6">
                  {pendingUploads.map(upload => (
                    <div key={upload.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <img 
                        src={upload.imageUrl} 
                        alt="" 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={upload.name}
                          onChange={(e) => updatePendingUpload(upload.id, 'name', e.target.value)}
                          placeholder="Item name"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                        <select
                          value={upload.category}
                          onChange={(e) => updatePendingUpload(upload.id, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        >
                          {categories.slice(1).map(cat => (
                            <option key={cat} value={cat} className="capitalize">{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setPendingUploads([])}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUploads}
                    disabled={uploading}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload Items'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Item</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteItem(showDeleteConfirm)}
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