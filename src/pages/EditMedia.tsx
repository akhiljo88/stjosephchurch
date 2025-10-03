import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, ArrowLeft, Upload } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { getMediaById, updateMedia } from '../lib/database';
import { isAdmin } from '../lib/auth';

const EditMedia: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'photo' | 'video'>('photo');
  const [src, setSrc] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
      return;
    }

    loadMedia();
  }, [navigate, id]);

  const loadMedia = async () => {
    if (!id) {
      navigate('/admin-dashboard');
      return;
    }

    setLoading(true);
    try {
      const media = await getMediaById(id);
      if (media) {
        setTitle(media.title);
        setDescription(media.description);
        setCategory(media.category);
        setType(media.type);
        setSrc(media.src);
        setPhotoPreview(media.type === 'photo' ? media.src : null);
      } else {
        alert('Media not found');
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Error loading media:', error);
      alert('Failed to load media data');
      navigate('/admin-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSrc(base64String);
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!category.trim()) {
      alert('Please enter a category');
      return;
    }

    if (!src.trim()) {
      alert('Please provide media source (photo or video URL)');
      return;
    }

    try {
      const mediaData = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        type,
        src: src.trim()
      };

      const result = await updateMedia(id!, mediaData);

      if (result) {
        alert('Media updated successfully!');
        navigate('/admin-dashboard');
      } else {
        alert('Failed to update media. Please try again.');
      }
    } catch (error) {
      console.error('Error updating media:', error);
      alert('An error occurred while updating the media.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
        <p className="text-red-900 font-serif text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header onMenuClick={() => setIsNavOpen(true)} />
      {isNavOpen && <Navigation onClose={() => setIsNavOpen(false)} />}

      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="flex items-center text-red-900 hover:text-red-700 mb-6 font-serif"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center mr-4">
                  <Image className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-red-900 font-serif">Edit Media</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter media title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="e.g., Events, Worship, 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Media Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="photo"
                        checked={type === 'photo'}
                        onChange={(e) => setType(e.target.value as 'photo' | 'video')}
                        className="mr-2"
                      />
                      <span className="font-serif text-red-900">Photo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="video"
                        checked={type === 'video'}
                        onChange={(e) => setType(e.target.value as 'photo' | 'video')}
                        className="mr-2"
                      />
                      <span className="font-serif text-red-900">Video</span>
                    </label>
                  </div>
                </div>

                {type === 'photo' ? (
                  <div>
                    <label className="block text-red-900 font-semibold mb-2 font-serif">
                      Photo *
                    </label>
                    <div className="space-y-4">
                      {photoPreview && (
                        <div className="relative w-full max-w-md mx-auto">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-auto object-cover rounded-xl border-2 border-amber-200"
                          />
                        </div>
                      )}
                      <label className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-300 font-serif">
                        <Upload className="w-5 h-5 mr-2" />
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-red-900 font-semibold mb-2 font-serif">
                      Video URL *
                    </label>
                    <input
                      type="url"
                      value={src}
                      onChange={(e) => setSrc(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                      placeholder="Enter YouTube or Instagram embed URL"
                      required
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                  >
                    Update Media
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin-dashboard')}
                    className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default EditMedia;
