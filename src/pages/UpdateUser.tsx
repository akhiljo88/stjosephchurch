import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Save, Home, ArrowLeft, X, Upload, Image, Plus } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { getUserById, updateUser } from '../lib/database';
import { isAdmin } from '../lib/auth';
import type { Database } from '../lib/supabase';

type UserType = Database['public']['Tables']['users']['Row'];

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [familyPhoto, setFamilyPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    monthlyCollection: 0,
    cleaning: 0,
    commonWork: 0,
    funeralFund: 0
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
      return;
    }

    if (id) {
      loadUser();
    }
  }, [id, navigate]);

  const loadUser = async () => {
    if (!id) return;
    
    try {
      const userData = await getUserById(id);
      if (userData) {
        setUser(userData);
        setCurrentPhoto(userData.family_photo);
        setFormData({
          name: userData.name,
          monthlyCollection: userData.monthly_collection,
          cleaning: userData.cleaning,
          commonWork: userData.common_work,
          funeralFund: userData.funeral_fund
        });
      } else {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      navigate('/admin-dashboard');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }

      setFamilyPhoto(file);
      setError('');
      
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
    setCurrentPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError('');

    try {
      let photoUrl = currentPhoto;
      
      if (familyPhoto) {
        const reader = new FileReader();
        photoUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(familyPhoto);
        });
      } else if (photoPreview === null && currentPhoto) {
        photoUrl = null;
      }

      const result = await updateUser(id, {
        ...formData,
        familyPhoto: photoUrl
      });
      
      if (result) {
        navigate('/admin-dashboard');
      } else {
        setError('Failed to update user. Please try again.');
      }
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'name' ? value : Number(value)
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
        <p className="text-red-900 font-serif text-xl">Loading...</p>
      </div>
    );
  }

  const displayPhoto = photoPreview || currentPhoto;

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
              <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 font-serif">Update User</h1>
              <p className="text-gray-700 font-serif">Update user details and amounts</p>
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
              <h2 className="text-2xl font-bold text-red-900 font-serif">Update Details</h2>
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

              {/* Family Photo Upload Section - Enlarged and Square */}
              <div>
                <label className="block text-red-900 font-semibold mb-2 font-serif">
                  Family Photo
                </label>
                <div className="space-y-4">
                  {displayPhoto ? (
                    <div className="relative">
                      <div className="w-full aspect-square max-w-md mx-auto bg-amber-100 rounded-xl border-2 border-amber-200 overflow-hidden shadow-lg">
                        <img
                          src={displayPhoto}
                          alt="Family photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4 rotate-45" />
                      </button>
                      {photoPreview && (
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                          New photo selected
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePhotoUploadClick}
                      className="w-full aspect-square max-w-md mx-auto bg-amber-100 rounded-xl border-2 border-dashed border-amber-300 hover:border-red-500 cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center group"
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
                  
                  {!displayPhoto && (
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
                  
                  {displayPhoto && (
                    <button
                      type="button"
                      onClick={handlePhotoUploadClick}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                      disabled={loading}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Change Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Only show financial fields for non-admin users */}
              {!user.is_admin && (
                <>
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
                </>
              )}

              {user.is_admin && (
                <div className="bg-purple-100 p-4 rounded-xl border border-purple-300">
                  <p className="text-purple-900 font-semibold font-serif text-center">
                    This is an administrator account. Financial amounts are not applicable.
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-6 h-6 mr-3" />
                  {loading ? 'Updating...' : 'Update'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-6 h-6 mr-3" />
                  Cancel
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

export default UpdateUser;