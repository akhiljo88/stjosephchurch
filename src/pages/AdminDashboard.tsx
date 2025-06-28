import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Heart, MessageSquare, Settings, BarChart3, LogOut, Plus } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const dashboardStats = [
    { label: 'Total Members', value: '342', icon: Users, color: 'from-blue-600 to-blue-700' },
    { label: 'Active Events', value: '8', icon: Calendar, color: 'from-green-600 to-green-700' },
    { label: 'Prayer Requests', value: '23', icon: Heart, color: 'from-red-600 to-red-700' },
    { label: 'Messages', value: '15', icon: MessageSquare, color: 'from-purple-600 to-purple-700' }
  ];

  const recentActivities = [
    { activity: 'New member registration - Maria Joseph', time: '2 hours ago' },
    { activity: 'Prayer request submitted - Family healing', time: '4 hours ago' },
    { activity: 'Event registration - Christmas Celebration', time: '6 hours ago' },
    { activity: 'Contact form submission - Wedding inquiry', time: '1 day ago' },
    { activity: 'Mass attendance updated - Sunday 9 AM', time: '2 days ago' }
  ];

  const quickActions = [
    { title: 'Add Event', icon: Calendar, color: 'from-blue-600 to-blue-700' },
    { title: 'Send Announcement', icon: MessageSquare, color: 'from-green-600 to-green-700' },
    { title: 'Manage Members', icon: Users, color: 'from-purple-600 to-purple-700' },
    { title: 'View Reports', icon: BarChart3, color: 'from-amber-600 to-amber-700' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-red-900 mb-2 font-serif">Admin Dashboard</h1>
            <p className="text-gray-700 font-serif">Welcome back, Administrator</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center px-6 py-3 bg-red-800 hover:bg-red-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </motion.div>

        {/* Dashboard Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 text-center shadow-xl border-2 border-amber-200 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-red-900 mb-2 font-serif">{stat.value}</h3>
                <p className="text-amber-600 font-serif">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-red-900 font-serif">{action.title}</h3>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200"
          >
            <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start p-4 bg-amber-100 rounded-xl">
                  <div className="w-3 h-3 bg-red-800 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-red-900 font-serif">{activity.activity}</p>
                    <p className="text-amber-600 text-sm font-serif mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Management Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200"
          >
            <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Management</h2>
            <div className="space-y-4">
              <button className="w-full p-4 bg-red-800 hover:bg-red-900 text-amber-100 rounded-xl transition-colors duration-300 flex items-center justify-between font-serif">
                <span>Manage Events</span>
                <Calendar className="w-5 h-5" />
              </button>
              <button className="w-full p-4 bg-blue-800 hover:bg-blue-900 text-amber-100 rounded-xl transition-colors duration-300 flex items-center justify-between font-serif">
                <span>Member Directory</span>
                <Users className="w-5 h-5" />
              </button>
              <button className="w-full p-4 bg-green-800 hover:bg-green-900 text-amber-100 rounded-xl transition-colors duration-300 flex items-center justify-between font-serif">
                <span>Prayer Requests</span>
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-full p-4 bg-purple-800 hover:bg-purple-900 text-amber-100 rounded-xl transition-colors duration-300 flex items-center justify-between font-serif">
                <span>Messages</span>
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="w-full p-4 bg-amber-700 hover:bg-amber-800 text-amber-100 rounded-xl transition-colors duration-300 flex items-center justify-between font-serif">
                <span>Settings</span>
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* System Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 bg-gradient-to-br from-red-800 to-red-900 rounded-3xl shadow-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-amber-100 mb-6 font-serif">System Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-amber-100 p-4 rounded-xl">
              <h3 className="font-bold text-red-900 mb-2 font-serif">Website</h3>
              <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-serif">Online</span>
            </div>
            <div className="bg-amber-100 p-4 rounded-xl">
              <h3 className="font-bold text-red-900 mb-2 font-serif">Database</h3>
              <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-serif">Connected</span>
            </div>
            <div className="bg-amber-100 p-4 rounded-xl">
              <h3 className="font-bold text-red-900 mb-2 font-serif">Backups</h3>
              <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-serif">Updated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;