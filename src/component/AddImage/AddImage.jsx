'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, ImagePlus, X, Check, Loader2, GalleryThumbnails } from 'lucide-react';
import Link from 'next/link';

export default function AddImage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [newImage, setNewImage] = useState({
    image: null,
    preview: '',
    title: '',
    category: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load saved images from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      setGalleryItems(JSON.parse(savedItems));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(prev => ({
          ...prev,
          image: file,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newImage.image || !newImage.title) return;

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newItem = {
        id: Date.now(), // Add unique ID for each item
        image: newImage.preview,
        title: newImage.title,
        category: newImage.category || 'Uncategorized',
        date: new Date().toISOString() // Add timestamp
      };

      const updatedItems = [...galleryItems, newItem];
      setGalleryItems(updatedItems);
      localStorage.setItem('galleryItems', JSON.stringify(updatedItems));

      setNewImage({
        image: null,
        preview: '',
        title: '',
        category: '',
      });

      setIsUploading(false);
      setIsSuccess(true);
      
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const removeImage = (index) => {
    const updatedItems = galleryItems.filter((_, i) => i !== index);
    setGalleryItems(updatedItems);
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Add New Gallery Image
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload and describe images to showcase in your gallery
          </p>
          
          {/* Add link to gallery page */}
          <div className="mt-6">
            <Link href="/gallery" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200">
              <GalleryThumbnails className="mr-2 h-5 w-5" />
              View Gallery Page
            </Link>
          </div>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-12"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Upload
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                  {newImage.preview ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <img
                        src={newImage.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewImage(prev => ({ ...prev, preview: '', image: null }))}
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
                        >
                          <span>Upload an image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Image Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newImage.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Elegant Living Room"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newImage.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Modern, Minimalist, Luxury, etc."
                />
              </div>
              

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={!newImage.image || !newImage.title || isUploading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                    (!newImage.image || !newImage.title) ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Uploading...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Success!
                    </>
                  ) : (
                    <>
                      <ImagePlus className="mr-2 h-5 w-5" />
                      Add to Gallery
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Your Gallery ({galleryItems.length} {galleryItems.length === 1 ? 'item' : 'items'})
          </h2>
          
          {galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No images added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    {item.category && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}