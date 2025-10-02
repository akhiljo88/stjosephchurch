import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Heart, LogOut, Home, Upload, Image, Brain } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import FinancialPlanningAI from '../components/FinancialPlanningAI';
import { getCurrentUserWithPhoto, signOut, isAuthenticated, isUser } from '../lib/auth';
import type { User as UserType } from '../lib/auth';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFinancialPlanning, setShowFinancialPlanning] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and is a regular user (not admin)
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // If user is admin, redirect to admin dashboard
    if (!isUser()) {
      navigate('/admin-dashboard');
      return;
    }

    loadUserData();
  }, [navigate]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUserWithPhoto();
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const upcomingEvents = [
    { event: 'Christmas Celebration', date: 'Dec 25, 2025', time: '12:00 AM' },
    { event: 'New Year Prayer Service', date: 'Dec 31, 2025', time: '11:00 PM' },
    { event: 'Feast of St. Joseph', date: 'Mar 19, 2026', time: '7:00 AM' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
        <p className="text-red-900 font-serif text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
        <p className="text-red-900 font-serif text-xl">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header onMenuClick={() => setIsNavOpen(true)} />
      <AnimatePresence>
        {isNavOpen && (
          <Navigation onClose={() => setIsNavOpen(false)} />
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
              <User className="w-10 h-10 md:w-12 md:h-12 text-amber-100" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 font-serif">Welcome, {user.name}</h1>
            <p className="text-gray-700 font-serif">Member since January 2023</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-blue-800 hover:bg-blue-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Home
            </button>
            <button className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-red-800 hover:bg-red-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif">
              <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Prayer Request
            </button>
            <button className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-green-800 hover:bg-green-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Book Mass
            </button>
            <button
              onClick={() => setShowFinancialPlanning(true)}
              className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-purple-800 hover:bg-purple-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif"
            >
              <Brain className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              AI Financial Planning
            </button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-amber-200"
            >
              <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-amber-100 rounded-xl">
                    <h3 className="font-semibold text-red-900 mb-2 font-serif">{event.event}</h3>
                    <div className="flex flex-col md:flex-row md:justify-between text-amber-600 text-sm font-serif">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-amber-200"
            >
              <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Family Photo</h2>
              <div className="bg-amber-100 rounded-2xl p-8 text-center">
                {user.familyPhoto ? (
                  <div className="space-y-4">
                    <div className="w-full aspect-square max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={user.familyPhoto}
                        alt="Family photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-red-900 font-serif text-sm">Your family photo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Image className="w-16 h-16 text-amber-100" />
                    </div>
                    <p className="text-red-900 font-serif">No family photo uploaded</p>
                    <p className="text-amber-600 font-serif text-sm">
                      Contact admin to upload your family photo
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-amber-200 mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-900 font-serif">Total Due Amount</h2>
              <div className="bg-red-800 text-amber-100 px-6 py-3 rounded-full font-bold text-xl font-serif mt-4 md:mt-0">
                ₹{user.total}
              </div>
            </div>

            <h3 className="text-xl font-bold text-red-900 mb-4 font-serif">Due Amounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-amber-300">
                    <th className="text-left p-3 text-red-900 font-serif">Monthly Collection</th>
                    <th className="text-left p-3 text-red-900 font-serif">Cleaning</th>
                    <th className="text-left p-3 text-red-900 font-serif">Common Work</th>
                    <th className="text-left p-3 text-red-900 font-serif">Funeral Fund</th>
                    <th className="text-left p-3 text-red-900 font-serif">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-200">
                    <td className="p-3 font-serif text-red-900">₹{user.monthlyCollection}</td>
                    <td className="p-3 font-serif text-red-900">₹{user.cleaning}</td>
                    <td className="p-3 font-serif text-red-900">₹{user.commonWork}</td>
                    <td className="p-3 font-serif text-red-900">₹{user.funeralFund}</td>
                    <td className="p-3 font-serif text-red-900 font-bold">₹{user.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Contact Admin</h2>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-amber-200">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Admin Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-800 to-red-900 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl">
                    <img
                      src="/images/3.jpg"
                      alt="Akhil Jose"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Admin Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-red-900 mb-2 font-serif">Akhil Jose</h3>
                  <p className="text-amber-600 font-serif text-lg mb-4">Secretary</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <span className="text-red-900 font-serif">6282440684</span>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
                        </svg>
                      </div>
                      <span className="text-red-900 font-serif">akhiljose060@gmail.com</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Actions */}
                <div className="flex flex-col space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://wa.me/+916282440684?text=Hello%20Akhil%20Jose', '_blank')}
                    className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('tel:6282440684', '_self')}
                    className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Call
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('mailto:akhiljose060@gmail.com', '_blank')}
                    className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
                    </svg>
                    Email
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-center"
          >
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
            >
              <LogOut className="w-6 h-6 mr-3" />
              Logout
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* AI Financial Planning Modal */}
      <AnimatePresence>
        {showFinancialPlanning && user && (
          <FinancialPlanningAI
            user={user}
            onClose={() => setShowFinancialPlanning(false)}
          />
        )}
      </AnimatePresence>
      
      <Copyright />
    </div>
  );
};

export default UserDashboard;