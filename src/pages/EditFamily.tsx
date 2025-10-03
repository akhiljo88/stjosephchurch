import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, ArrowLeft, Upload, X } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { getFamilyById, updateFamily } from '../lib/database';
import { isAdmin } from '../lib/auth';

const EditFamily: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [headOfFamily, setHeadOfFamily] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [members, setMembers] = useState<Array<{ name: string; age: number; relation: string }>>([
    { name: '', age: 0, relation: '' }
  ]);
  const [familyPhoto, setFamilyPhoto] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
      return;
    }

    loadFamily();
  }, [navigate, id]);

  const loadFamily = async () => {
    if (!id) {
      navigate('/admin-dashboard');
      return;
    }

    setLoading(true);
    try {
      const family = await getFamilyById(id);
      if (family) {
        setHeadOfFamily(family.headOfFamily);
        setContactNumber(family.contactNumber);
        setAddress(family.address);
        setMembers(family.members || [{ name: '', age: 0, relation: '' }]);
        setFamilyPhoto(family.familyPhoto || null);
        setPhotoPreview(family.familyPhoto || null);
      } else {
        alert('Family not found');
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Error loading family:', error);
      alert('Failed to load family data');
      navigate('/admin-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    setMembers([...members, { name: '', age: 0, relation: '' }]);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (index: number, field: string, value: string | number) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFamilyPhoto(base64String);
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!headOfFamily.trim()) {
      alert('Please enter head of family name');
      return;
    }

    if (!contactNumber.trim()) {
      alert('Please enter contact number');
      return;
    }

    if (!address.trim()) {
      alert('Please enter address');
      return;
    }

    const validMembers = members.filter(m => m.name.trim() && m.age > 0 && m.relation.trim());
    if (validMembers.length === 0) {
      alert('Please add at least one family member');
      return;
    }

    try {
      const familyData = {
        headOfFamily: headOfFamily.trim(),
        contactNumber: contactNumber.trim(),
        address: address.trim(),
        numberOfMembers: validMembers.length,
        members: validMembers,
        familyPhoto: familyPhoto
      };

      const result = await updateFamily(id!, familyData);

      if (result) {
        alert('Family updated successfully!');
        navigate('/admin-dashboard');
      } else {
        alert('Failed to update family. Please try again.');
      }
    } catch (error) {
      console.error('Error updating family:', error);
      alert('An error occurred while updating the family.');
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-red-900 font-serif">Edit Family</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Head of Family *
                  </label>
                  <input
                    type="text"
                    value={headOfFamily}
                    onChange={(e) => setHeadOfFamily(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter head of family name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Address *
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                    placeholder="Enter address"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-red-900 font-semibold mb-2 font-serif">
                    Family Photo
                  </label>
                  <div className="space-y-4">
                    {photoPreview && (
                      <div className="relative w-48 h-48 mx-auto">
                        <img
                          src={photoPreview}
                          alt="Family preview"
                          className="w-full h-full object-cover rounded-xl border-2 border-amber-200"
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

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-red-900 font-semibold font-serif">
                      Family Members *
                    </label>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 font-serif"
                    >
                      Add Member
                    </button>
                  </div>

                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <div key={index} className="p-4 bg-amber-100 rounded-xl border-2 border-amber-200">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-red-900 font-serif">Member {index + 1}</h4>
                          {members.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(index)}
                              className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                            className="px-3 py-2 rounded-lg border-2 border-amber-300 focus:border-red-500 focus:outline-none font-serif"
                            placeholder="Name"
                          />
                          <input
                            type="number"
                            value={member.age || ''}
                            onChange={(e) => handleMemberChange(index, 'age', parseInt(e.target.value) || 0)}
                            className="px-3 py-2 rounded-lg border-2 border-amber-300 focus:border-red-500 focus:outline-none font-serif"
                            placeholder="Age"
                            min="0"
                          />
                          <input
                            type="text"
                            value={member.relation}
                            onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
                            className="px-3 py-2 rounded-lg border-2 border-amber-300 focus:border-red-500 focus:outline-none font-serif"
                            placeholder="Relation"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                  >
                    Update Family
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

export default EditFamily;
