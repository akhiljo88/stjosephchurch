import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Home, ArrowLeft, Upload, Image, X, User } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { addFamily } from '../lib/database';
import { isAdmin } from '../lib/auth';

interface FamilyMember {
  name: string;
  age: number;
  relation: string;
}

const AddFamily: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [familyPhoto, setFamilyPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([
    { name: '', age: 0, relation: 'Head of Family' }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    headOfFamily: '',
    contactNumber: '',
    address: '',
    numberOfMembers: 1
  });

  React.useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
    }
  }, [navigate]);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addMember = () => {
    setMembers([...members, { name: '', age: 0, relation: '' }]);
    setFormData({ ...formData, numberOfMembers: members.length + 1 });
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
      setFormData({ ...formData, numberOfMembers: newMembers.length });
    }
  };

  const updateMember = (index: number, field: keyof FamilyMember, value: string | number) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
    
    // Update head of family if first member name changes
    if (index === 0 && field === 'name') {
      setFormData({ ...formData, headOfFamily: value as string });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let photoUrl = null;
      
      if (familyPhoto) {
        const reader = new FileReader();
        photoUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(familyPhoto);
        });
      }

      const familyData = {
        headOfFamily: formData.headOfFamily || members[0]?.name || '',
        contactNumber: formData.contactNumber,
        address: formData.address,
        numberOfMembers: members.length,
        members: members,
        familyPhoto: photoUrl
      };

      const result = await addFamily(familyData);
      
      if (result) {
        navigate('/admin-dashboard');
      } else {
        setError('Failed to add family. Please try again.');
      }
    } catch (err) {
      setError('Failed to add family. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 font-serif">Add Family</h1>
              <p className="text-gray-700 font-serif">Register a new family in the parish</p>
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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-900 font-serif">Family Information</h2>
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
                  <label htmlFor="headOfFamily" className="block text-red-900 font-semibold mb-2 font-serif">
                    Head of Family
                  </label>
                  <input
                    type="text"
                    id="headOfFamily"
                    name="headOfFamily"
                    value={formData.headOfFamily || members[0]?.name || ''}
                    onChange={(e) => {
                      handleInputChange(e);
                      updateMember(0, 'name', e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter head of family name"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-red-900 font-semibold mb-2 font-serif">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter contact number"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-red-900 font-semibold mb-2 font-serif">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif resize-none"
                  placeholder="Enter family address"
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
                      <div className="w-full aspect-video max-w-md mx-auto bg-amber-100 rounded-xl border-2 border-amber-200 overflow-hidden shadow-lg">
                        <img
                          src={photoPreview}
                          alt="Family photo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300"
                        disabled={loading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePhotoUploadClick}
                      className="w-full aspect-video max-w-md mx-auto bg-amber-100 rounded-xl border-2 border-dashed border-amber-300 hover:border-red-500 cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-red-900 font-semibold font-serif mb-2">Upload Family Photo</p>
                      <p className="text-amber-600 text-sm font-serif text-center px-4">
                        Click to select an image from your device
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
                  
                  <button
                    type="button"
                    onClick={handlePhotoUploadClick}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                    disabled={loading}
                  >
                    <Image className="w-5 h-5 mr-2" />
                    {photoPreview ? 'Change Photo' : 'Choose Photo from Gallery'}
                  </button>
                </div>
              </div>

              {/* Family Members Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-red-900 font-semibold font-serif">
                    Family Members ({members.length})
                  </label>
                  <button
                    type="button"
                    onClick={addMember}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
                    disabled={loading}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </button>
                </div>

                <div className="space-y-4">
                  {members.map((member, index) => (
                    <div key={index} className="bg-amber-100 p-4 rounded-xl border border-amber-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-red-900 font-serif">
                          Member {index + 1} {index === 0 && '(Head of Family)'}
                        </h4>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-300"
                            disabled={loading}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-red-800 font-medium mb-1 font-serif text-sm">Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateMember(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-amber-300 focus:border-red-500 focus:outline-none font-serif"
                            placeholder="Enter name"
                            required
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-red-800 font-medium mb-1 font-serif text-sm">Age</label>
                          <input
                            type="number"
                            value={member.age || ''}
                            onChange={(e) => updateMember(index, 'age', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border border-amber-300 focus:border-red-500 focus:outline-none font-serif"
                            placeholder="Age"
                            min="0"
                            max="120"
                            required
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-red-800 font-medium mb-1 font-serif text-sm">Relation</label>
                          <select
                            value={member.relation}
                            onChange={(e) => updateMember(index, 'relation', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-amber-300 focus:border-red-500 focus:outline-none font-serif"
                            required
                            disabled={loading || index === 0}
                          >
                            {index === 0 ? (
                              <option value="Head of Family">Head of Family</option>
                            ) : (
                              <>
                                <option value="">Select relation</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Other">Other</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Users className="w-6 h-6 mr-3" />
                  {loading ? 'Adding Family...' : 'Add Family'}
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

export default AddFamily;