//src/components/UploadModal.js

'use client';
import { useState } from 'react';

export default function UploadModal({ user, updateUser }) {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target.result;
        
        // Mock AI processing
        setProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newClothingItem = {
          id: Date.now() + Math.random(),
          image: imageUrl,
          name: file.name.split('.')[0],
          category: mockAIClassification(),
          tags: mockAITags(),
          dateAdded: new Date().toISOString()
        };
        
        const updatedUser = {
          ...user,
          clothes: [...user.clothes, newClothingItem]
        };
        
        updateUser(updatedUser);
        setProcessing(false);
      };
      reader.readAsDataURL(file);
    }
    
    setUploading(false);
  };

  const mockAIClassification = () => {
    const categories = ['tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const mockAITags = () => {
    const allTags = ['casual', 'formal', 'summer', 'winter', 'cotton', 'denim', 'leather'];
    return allTags.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Upload Clothes</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <div className="text-4xl mb-4">📷</div>
          <h3 className="text-lg font-medium mb-2">Upload your clothing photos</h3>
          <p className="text-gray-600 mb-6">
            Our AI will automatically detect and categorize your items
          </p>
          
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Choose Photos
          </label>
        </div>
        
        {(uploading || processing) && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p className="text-gray-600">
              {processing ? 'AI is processing your images...' : 'Uploading...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}