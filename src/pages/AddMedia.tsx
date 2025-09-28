import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, Upload, Home, ArrowLeft, X, Plus, Image as ImageIcon } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { addMedia } from '../lib/database';
import { isAdmin } from '../lib/auth';

const AddMedia: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  React.useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    if (validFiles.length !== files.length) {
      setError('Please select only image or video files.');
      return;
    }

    // Validate file sizes (max 10MB each)
    const oversizedFiles = validFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError('Some files are larger than 10MB. Please choose smaller files.');
      return;
    }

    setSelectedFiles(validFiles);
    setError('');
    
    // Create previews
    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === validFiles.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setError('Please select at least one file to upload.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Convert files to base64 for storage
      const mediaItems = await Promise.all(
        selectedFiles.map(async (file, index) => {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });

          return {
            title: formData.title || `Media ${index + 1}`,
            description: formData.description,
            category: formData.category,
            type: file.type.startsWith('image/') ? 'photo' : 'video',
            src: base64,
            filename: file.name
          };
        })
      );

      // Add each media item to database
      for (const item of mediaItems) {
        await addMedia(item);
      }
      
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Failed to upload media. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header onMenuClick={() => setIsNavOpen(true)} />
      <AnimatePresence>
        {isNavOpen && (
          <Navigation onClose={() => setIsNavOpen(false)} />
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 font-serif">Add Media</h1>
              <p className="text-gray-700 font-serif">Upload images and videos to gallery</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center px-4 py-2 bg-blue-800 hover:bg-blue-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-900 font-serif">Upload Media Files</h2>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl"
              >
                <p className="text-red-700 text-sm font-serif text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-red-900 font-semibold mb-2 font-serif">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter media title"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-red-900 font-semibold mb-2 font-serif">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    required
                    disabled={loading}
                  >
                    <option value="">Select category</option>
                    <option value="Events">Events</option>
                    <option value="Worship">Worship</option>
                    <option value="Community">Community</option>
                    <option value="Celebrations">Celebrations</option>
                    <option value="Youth">Youth Activities</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-red-900 font-semibold mb-2 font-serif">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif resize-none"
                  placeholder="Enter description"
                  disabled={loading}
                />
              </div>

              {/* File Upload Section */}
              <div>
                <label className="block text-red-900 font-semibold mb-2 font-serif">
                  Upload Files
                </label>
                
                {selectedFiles.length === 0 ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUploadClick}
                    className="w-full h-64 bg-amber-100 rounded-xl border-2 border-dashed border-amber-300 hover:border-red-500 cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-red-900 font-semibold font-serif mb-2">Upload Images & Videos</p>
                    <p className="text-amber-600 text-sm font-serif text-center px-4">
                      Click to select files from your device
                    </p>
                    <p className="text-amber-500 text-xs font-serif mt-2">
                      Supported: JPG, PNG, GIF, MP4, MOV (Max 10MB each)
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-amber-100 rounded-xl overflow-hidden shadow-lg">
                            {selectedFiles[index].type.startsWith('image/') ? (
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={preview}
                                className="w-full h-full object-cover"
                                controls
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300"
                            disabled={loading}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-serif truncate">
                              {selectedFiles[index].name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                      disabled={loading}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add More Files
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                  disabled={loading}
                />
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  type="submit"
                  disabled={loading || selectedFiles.length === 0}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  {loading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default AddMedia;