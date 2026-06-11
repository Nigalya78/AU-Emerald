'use client';

import { useState, useEffect } from 'react';

interface TestImage {
  id: string;
  name: string;
  url: string;
  status: 'loading' | 'loaded' | 'error';
}

export default function ImageTest() {
  const [images, setImages] = useState<TestImage[]>([
    {
      id: '1',
      name: 'Pexels Image 1',
      url: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'loading'
    },
    {
      id: '2',
      name: 'Pexels Image 2',
      url: 'https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'loading'
    },
    {
      id: '3',
      name: 'Pexels Image 3',
      url: 'https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'loading'
    }
  ]);

  useEffect(() => {
    const testImageLoading = async () => {
      const updatedImages = [...images];
      
      for (let i = 0; i < updatedImages.length; i++) {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Test CORS handling
        
        try {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = updatedImages[i].url;
          });
          updatedImages[i].status = 'loaded';
          console.log(`✅ Image ${updatedImages[i].name} loaded successfully`);
        } catch (error) {
          updatedImages[i].status = 'error';
          console.error(`❌ Image ${updatedImages[i].name} failed to load:`, error);
        }
        
        setImages([...updatedImages]);
      }
    };

    testImageLoading();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Image Loading Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">{image.name}</h3>
            
            <div className="relative">
              {image.status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <span className="text-gray-600">Loading...</span>
                </div>
              )}
              
              {image.status === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100">
                  <span className="text-red-600 text-center">Failed to load</span>
                </div>
              )}
              
              <img
                src={image.url}
                alt={image.name}
                className={`w-full h-48 object-cover rounded ${
                  image.status === 'loaded' ? 'block' : 'hidden'
                }`}
                onLoad={() => console.log(`Image ${image.name} rendered`)}
                onError={(e) => console.error(`Image ${image.name} render error:`, e)}
              />
            </div>
            
            <div className="mt-2">
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                image.status === 'loaded' 
                  ? 'bg-green-100 text-green-800' 
                  : image.status === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {image.status}
              </span>
            </div>
            
            <div className="mt-2 text-xs text-gray-600 break-all">
              {image.url}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="font-semibold mb-2">Console Logs:</h2>
        <p className="text-sm text-gray-600">
          Check browser console for detailed loading information.
        </p>
      </div>
    </div>
  );
}
