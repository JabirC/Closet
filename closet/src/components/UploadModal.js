//src/components/UploadModal.js

'use client';
import { useState } from 'react';

export default function UploadModal({ onClose, onAddItem }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = async (files) => {
    setIsProcessing(true);
    
    // Mock AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const processedFiles = files.map((file, index) => {
      const categories = ['tops', 'bottoms', 'shoes', 'accessories', 'outerwear'];
      const tags = ['casual', 'formal', 'summer', 'winter', 'cotton', 'denim'];
      
      return {
        file,
        name: file.name.split('.')[0],
        category: categories[Math.floor(Math.random() * categories.length)],
        tags: tags.slice(0, Math.floor(Math.random() * 3) + 1),
        imageUrl: URL.createObjectURL(file),
        aiProcessed: true
      };
    });
    
    setUploadedFiles(processedFiles);
    setIsProcessing(false);
  };

  const handleSaveItems = () => {
    uploadedFiles.forEach(item => {
      onAddItem({
        name: item.name,
        category: item.category,
        tags: item.tags,
        imageUrl: item.imageUrl
      });
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light">Add Clothing Items</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {uploadedFiles.length === 0 ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive ? 'border-black bg-gray-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isProcessing ? (
              <div className="space-y-4">
                <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-black rounded-full mx-auto"></div>
                <p className="text-gray-600">AI is processing your images...</p>
              </div>
            ) : (
              <>
                <div className="text-4xl mb-4">📸</div>
                <p className="text-lg text-gray-600 mb-4">Drop your clothing photos here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <label className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  Choose Files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">AI has processed your images and detected the following items:</p>
            <div className="grid grid-cols-2 gap-4">
              {uploadedFiles.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...uploadedFiles];
                      updated[index].name = e.target.value;
                      setUploadedFiles(updated);
                    }}
                    className="w-full px-2 py-1 border rounded mb-2"
                  />
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...uploadedFiles];
                      updated[index].category = e.target.value;
                      setUploadedFiles(updated);
                    }}
                    className="w-full px-2 py-1 border rounded mb-2"
                  >
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                    <option value="outerwear">Outerwear</option>
                  </select>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveItems}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Items
              </button>
              <button
                onClick={() => setUploadedFiles([])}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}