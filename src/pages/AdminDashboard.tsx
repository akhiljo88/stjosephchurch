import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Heart, MessageSquare, Settings, BarChart3, LogOut, Plus, Home, Edit, Trash2, Shield } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import { getUsers, deleteUser, getEvents, deleteEvent } from '../lib/database';
import { signOut, isAdmin, getCurrentUser } from '../lib/auth';
import type { Database } from '../lib/supabase';

type User = Database['public']['Tables']['users']['Row'];
type Event = Database['public']['Tables']['events']['Row'];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  useEffect(() => {
    // Check if user is admin, redirect to login if not authenticated or not admin
    if (!isAdmin()) {
      navigate('/login');
      return;
    }

    // Get current admin user info
    const adminUser = getCurrentUser();
    setCurrentAdmin(adminUser);

    loadUsers();
    loadEvents();
  }, [navigate]);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getUsers();
      setUsers(usersData.filter(user => !user.is_admin)); // Don't show admin users in the table
      setFilteredUsers(usersData.filter(user => !user.is_admin));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const success = await deleteUser(id);
      if (success) {
        await loadUsers(); // Reload users after deletion
      } else {
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const success = await deleteEvent(id);
      if (success) {
        await loadEvents(); // Reload events after deletion
      } else {
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const dashboardStats = [
    { label: 'Total Members', value: users.length.toString(), icon: Users, color: 'from-blue-600 to-blue-700' },
    { label: 'Active Events', value: events.length.toString(), icon: Calendar, color: 'from-green-600 to-green-700' },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header onMenuClick={() => setIsNavOpen(true)} />
      <AnimatePresence>
        {isNavOpen && (
          <Navigation onClose={() => setIsNavOpen(false)} />
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center mb-12"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                <img 
                  src="/images/3.jpg" 
                  alt="Admin Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 font-serif">Admin Dashboard</h1>
                <p className="text-gray-700 font-serif">Akhil, {currentAdmin?.name || 'Administrator'}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center px-4 py-2 bg-blue-800 hover:bg-blue-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-800 hover:bg-red-900 text-amber-100 rounded-full shadow-lg transition-colors duration-300 font-serif"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            {dashboardStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 md:p-6 text-center shadow-xl border-2 border-amber-200 cursor-pointer"
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-red-900 mb-2 font-serif">{stat.value}</h3>
                  <p className="text-amber-600 font-serif text-sm md:text-base">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12"
          >
            <div className="grid lg:grid-cols-4 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-6 border-4 border-amber-200"
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/3.jpg" 
                      alt="Admin Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-2 font-serif">{currentAdmin?.name || 'Akhil'}</h3>
                  <div className="flex items-center justify-center mb-3">
                    <Shield className="w-4 h-4 text-amber-600 mr-2" />
                    <span className="text-amber-600 font-serif text-sm">System Administrator</span>
                  </div>
                  <div className="bg-amber-100 px-4 py-2 rounded-full">
                    <span className="text-red-900 text-sm font-semibold font-serif">Full Access</span>
                  </div>
                </div>
              </motion.div>
              
              <div className="lg:col-span-3">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-red-900 font-serif">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/add-user')}
                    className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-red-900 font-serif text-sm md:text-base">Add User</h3>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/add-event')}
                    className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-red-900 font-serif text-sm md:text-base">Add Events</h3>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-red-900 font-serif text-sm md:text-base">Add Families</h3>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-red-900 font-serif text-sm md:text-base">Add Services</h3>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">Event Management</h2>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-amber-200 overflow-x-auto">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-red-900 font-serif">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-serif">No events found. Add your first event to get started.</p>
                </div>
              ) : (
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b-2 border-amber-300">
                      <th className="text-left p-3 text-red-900 font-serif">Title</th>
                      <th className="text-left p-3 text-red-900 font-serif">Date</th>
                      <th className="text-left p-3 text-red-900 font-serif">Time</th>
                      <th className="text-left p-3 text-red-900 font-serif">Description</th>
                      <th className="text-left p-3 text-red-900 font-serif">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-amber-200 hover:bg-amber-100">
                        <td className="p-3 font-serif text-red-900 font-semibold">{event.title}</td>
                        <td className="p-3 font-serif text-red-900">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="p-3 font-serif text-red-900">{event.time}</td>
                        <td className="p-3 font-serif text-red-900 max-w-xs truncate">{event.description}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/edit-event/${event.id}`)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                              title="Edit Event"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                              title="Delete Event"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-red-900 mb-6 font-serif">User Management</h2>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Plus className="h-5 w-5 text-amber-600 rotate-45 hover:text-red-600 transition-colors duration-200" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <p className="mt-2 text-sm text-amber-600 font-serif">
                  {filteredUsers.length === 0 
                    ? `No users found matching "${searchTerm}"` 
                    : `Found ${filteredUsers.length} user${filteredUsers.length === 1 ? '' : 's'} matching "${searchTerm}"`
                  }
                </p>
              )}
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-amber-200 overflow-x-auto">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-red-900 font-serif">Loading users...</p>
                </div>
              ) : (
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b-2 border-amber-300">
                      <th className="text-left p-3 text-red-900 font-serif">Name</th>
                      <th className="text-left p-3 text-red-900 font-serif">Monthly Collection</th>
                      <th className="text-left p-3 text-red-900 font-serif">Cleaning</th>
                      <th className="text-left p-3 text-red-900 font-serif">Common Work</th>
                      <th className="text-left p-3 text-red-900 font-serif">Funeral Fund</th>
                      <th className="text-left p-3 text-red-900 font-serif">Total</th>
                      <th className="text-left p-3 text-red-900 font-serif">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-amber-200 hover:bg-amber-100">
                        <td className="p-3 font-serif text-red-900">{user.name}</td>
                        <td className="p-3 font-serif text-red-900">₹{user.monthly_collection}</td>
                        <td className="p-3 font-serif text-red-900">₹{user.cleaning}</td>
                        <td className="p-3 font-serif text-red-900">₹{user.common_work}</td>
                        <td className="p-3 font-serif text-red-900">₹{user.funeral_fund}</td>
                        <td className="p-3 font-serif text-red-900 font-bold">₹{user.total}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/update-user/${user.id}`)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && !loading && searchTerm === '' && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500 font-serif">
                          No users found. Add your first user to get started.
                        </td>
                      </tr>
                    )}
                    {filteredUsers.length === 0 && !loading && searchTerm !== '' && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500 font-serif">
                          No users found matching "{searchTerm}". Try a different search term.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-amber-200"
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
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default AdminDashboard;