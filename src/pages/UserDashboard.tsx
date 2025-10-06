import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Heart, LogOut, Home, Upload, Image, Brain, Phone, Mail, MessageCircle, Instagram } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import FinancialPlanningAI from '../components/FinancialPlanningAI';
import { getCurrentUserWithPhoto, signOut, isAuthenticated, isUser } from '../lib/auth';
import type { User as UserType } from '../lib/auth';
import { getEvents } from '../lib/database';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFinancialPlanning, setShowFinancialPlanning] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!isUser()) {
      navigate('/admin-dashboard');
      return;
    }

    loadUserData();
    loadEvents();
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

  const loadEvents = async () => {
    try {
      const events = await getEvents();
      const formattedEvents = events.map((event: any) => ({
        event: event.title,
        date: new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: event.time
      }));
      setUpcomingEvents(formattedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

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
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-amber-200 mb-12"
          >
            <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif text-center">Contact Admin</h2>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-800 to-red-900 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl mb-4">
                <img
                  src="/images/3 copy copy.jpg"
                  alt="Akhil Jose"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-red-900 font-serif">Akhil Jose</h3>
              <p className="text-amber-600 font-serif">Secretary</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.a
                href="tel:6282440684"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-sm font-serif">Phone</span>
              </motion.a>

              <motion.a
                href="https://wa.me/6282440684?text=Hello%20Akhil"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-sm font-serif">WhatsApp</span>
              </motion.a>

              <motion.a
                href="mailto:akhiljose060@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-sm font-serif">Gmail</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/akhil_____jo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Instagram className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-sm font-serif">Instagram</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
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