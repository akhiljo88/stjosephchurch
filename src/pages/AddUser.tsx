import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Plus, Home, ArrowLeft, Upload, Image } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { addUser } from '../lib/database';
import { isAdmin } from '../lib/auth';

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [familyPhoto, setFamilyPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    monthlyCollection: 100,
    cleaning: 50,
    commonWork: 75,
    funeralFund: 25
  });

  React.useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }

      setFamilyPhoto(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setFamilyPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let photoUrl = null;
      
      // If a photo is selected, convert to base64 for storage
      if (familyPhoto) {
        const reader = new FileReader();
        photoUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(familyPhoto);
        });
      }

      const result = await addUser({
        ...formData,
        familyPhoto: photoUrl
      });
      
      if (result) {
        navigate('/admin-dashboard');
      } else {
        setError('Failed to add user. Please try again.');
      }
    } catch (err) {
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'name' || name === 'username' || name === 'password' ? value : Number(value)
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
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 font-serif">Add New User</h1>
              <p className="text-gray-700 font-serif">Create a new user account</p>
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
                <User className="w-10 h-10 text-amber-100" />
              </div>
              <h2 className="text-2xl font-bold text-red-900 font-serif">User Information</h2>
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
                  <label htmlFor="name" className="block text-red-900 font-semibold mb-2 font-serif">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-red-900 font-semibold mb-2 font-serif">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter username"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-red-900 font-semibold mb-2 font-serif">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
              </div>

              {/* Family Photo Upload Section */}
              <div>
                <label className="block text-red-900 font-semibold mb-2 font-serif">
                  Family Photo
                </label>
                <div className="space-y-4">
                  {photoPreview ? (
                    <div className="relative">
                      <div className="w-full h-48 bg-amber-100 rounded-xl border-2 border-amber-200 overflow-hidden">
                        <img
                          src={photoPreview}
                          alt="Family photo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4 rotate-45" />
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePhotoUploadClick}
                      className="w-full h-48 bg-amber-100 rounded-xl border-2 border-dashed border-amber-300 hover:border-red-500 cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                        <Upload className="w-8 h-8 text-amber-100" />
                      </div>
                      <p className="text-red-900 font-semibold font-serif mb-2">Upload Family Photo</p>
                      <p className="text-amber-600 text-sm font-serif text-center px-4">
                        Click to select an image from your device
                      </p>
                      <p className="text-amber-500 text-xs font-serif mt-2">
                        Supported: JPG, PNG, GIF (Max 5MB)
                      </p>
                    </motion.div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={loading}
                  />
                  
                  {!photoPreview && (
                    <button
                      type="button"
                      onClick={handlePhotoUploadClick}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                      disabled={loading}
                    >
                      <Image className="w-5 h-5 mr-2" />
                      Choose Photo from Gallery
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="monthlyCollection" className="block text-red-900 font-semibold mb-2 font-serif">
                    Monthly Collection (₹)
                  </label>
                  <input
                    type="number"
                    id="monthlyCollection"
                    name="monthlyCollection"
                    value={formData.monthlyCollection}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    min="0"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="cleaning" className="block text-red-900 font-semibold mb-2 font-serif">
                    Cleaning (₹)
                  </label>
                  <input
                    type="number"
                    id="cleaning"
                    name="cleaning"
                    value={formData.cleaning}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    min="0"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="commonWork" className="block text-red-900 font-semibold mb-2 font-serif">
                    Common Work (₹)
                  </label>
                  <input
                    type="number"
                    id="commonWork"
                    name="commonWork"
                    value={formData.commonWork}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    min="0"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="funeralFund" className="block text-red-900 font-semibold mb-2 font-serif">
                    Funeral Fund (₹)
                  </label>
                  <input
                    type="number"
                    id="funeralFund"
                    name="funeralFund"
                    value={formData.funeralFund}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    min="0"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="bg-amber-100 p-4 rounded-xl">
                <p className="text-red-900 font-semibold font-serif">
                  Total Amount: ₹{formData.monthlyCollection + formData.cleaning + formData.commonWork + formData.funeralFund}
                </p>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-6 h-6 mr-3" />
                  {loading ? 'Adding User...' : 'Add User'}
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

export default AddUser;