import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, BookOpen, Bell, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const UserPanel: React.FC = () => {
  const navigate = useNavigate();

  const userStats = [
    { label: 'Masses Attended', value: '24', icon: Calendar, color: 'from-blue-600 to-blue-700' },
    { label: 'Prayer Requests', value: '8', icon: Heart, color: 'from-red-600 to-red-700' },
    { label: 'Events Joined', value: '12', icon: Calendar, color: 'from-green-600 to-green-700' },
    { label: 'Community Groups', value: '2', icon: BookOpen, color: 'from-purple-600 to-purple-700' }
  ];

  const recentActivities = [
    { activity: 'Attended Sunday Mass', date: '2 days ago', type: 'mass' },
    { activity: 'Joined Youth Fellowship Meeting', date: '1 week ago', type: 'event' },
    { activity: 'Submitted Prayer Request', date: '2 weeks ago', type: 'prayer' },
    { activity: 'Participated in Charity Drive', date: '3 weeks ago', type: 'service' }
  ];

  const upcomingEvents = [
    { event: 'Christmas Celebration', date: 'Dec 25, 2025', time: '12:00 AM' },
    { event: 'New Year Prayer Service', date: 'Dec 31, 2025', time: '11:00 PM' },
    { event: 'Feast of St. Joseph', date: 'Mar 19, 2026', time: '7:00 AM' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <HomeButton />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
              <User className="w-12 h-12 text-amber-100" />
            </div>
            <h1 className="text-4xl font-bold text-red-900 mb-2 font-serif">Welcome, John Doe</h1>
            <p className="text-gray-700 font-serif">Member since January 2023</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button className="flex items-center px-6 py-3 bg-red-800 hover:bg-red-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif">
              <Heart className="w-5 h-5 mr-2" />
              Prayer Request
            </button>
            <button className="flex items-center px-6 py-3 bg-blue-800 hover:bg-blue-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif">
              <Calendar className="w-5 h-5 mr-2" />
              Book Mass
            </button>
            <button className="flex items-center px-6 py-3 bg-green-800 hover:bg-green-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {userStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 text-center shadow-xl border-2 border-amber-200"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-red-900 mb-2 font-serif">{stat.value}</h3>
                  <p className="text-amber-600 font-serif">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200"
            >
              <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center p-4 bg-amber-100 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-amber-100" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-900 font-serif">{activity.activity}</h3>
                      <p className="text-amber-600 text-sm font-serif">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200"
            >
              <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-amber-100 rounded-xl">
                    <h3 className="font-semibold text-red-900 mb-2 font-serif">{event.event}</h3>
                    <div className="flex justify-between text-amber-600 text-sm font-serif">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 bg-gradient-to-br from-red-800 to-red-900 rounded-3xl shadow-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings className="w-8 h-8 text-red-900" />
            </div>
            <h2 className="text-2xl font-bold text-amber-100 mb-4 font-serif">Account Settings</h2>
            <p className="text-amber-200 font-serif mb-6">
              Update your profile information, prayer preferences, and notification settings.
            </p>
            <button className="px-8 py-3 bg-amber-100 hover:bg-amber-200 text-red-900 font-semibold rounded-full transition-colors duration-300 font-serif">
              Manage Account
            </button>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default UserPanel;