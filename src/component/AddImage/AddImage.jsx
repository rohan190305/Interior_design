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
  const [error, setError] = useState(null);

  // Load images from server on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error('Error loading images:', error);
        setError('Failed to load gallery images');
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        setError('Please select an image file (JPEG, PNG, GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(prev => ({
          ...prev,
          image: file,
          preview: reader.result
        }));
        setError(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newImage.image || !newImage.title) {
      setError('Please provide both an image and a title');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', newImage.image);
      formData.append('title', newImage.title);
      formData.append('category', newImage.category || 'Uncategorized');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const uploadedImage = await response.json();
      
      setGalleryItems(prev => [uploadedImage, ...prev]);
      setNewImage({
        image: null,
        preview: '',
        title: '',
        category: '',
      });

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }

      // Optimistic update
      setGalleryItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message || 'Failed to delete image');
      
      // Re-fetch to sync with server
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setGalleryItems(data);
    }
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
          
          {/* Link to gallery page */}
          <div className="mt-6">
            <Link 
              href="/gallery" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
            >
              <GalleryThumbnails className="mr-2 h-5 w-5" />
              View Gallery Page
            </Link>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(item.id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 hover:text-red-600 transition-colors"
                      aria-label={`Delete ${item.title}`}
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