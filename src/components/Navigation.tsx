import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Home, Users, Settings, Church, Heart, Calendar, Phone, UserCheck, Shield, User } from 'lucide-react';
import { isAuthenticated, isAdmin } from '../lib/auth';

interface NavigationProps {
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onClose }) => {
  const authenticated = isAuthenticated();
  const adminUser = isAdmin();

  const menuItems = [
    { path: '/', label: 'Home', icon: Home, color: 'from-blue-600 to-blue-700' },
    { path: '/about', label: 'About Us', icon: Church, color: 'from-purple-600 to-purple-700' },
    { path: '/administration', label: 'Administration', icon: Users, color: 'from-green-600 to-green-700' },
    { path: '/services', label: 'Our Services', icon: Heart, color: 'from-red-600 to-red-700' },
    { path: '/holy-communities', label: 'Holy Communities', icon: Users, color: 'from-indigo-600 to-indigo-700' },
    { path: '/families', label: 'Our Families', icon: Heart, color: 'from-pink-600 to-pink-700' },
    { path: '/events', label: 'Events & Timings', icon: Calendar, color: 'from-amber-600 to-amber-700' },
    { path: '/contact', label: 'Connect With Us', icon: Phone, color: 'from-teal-600 to-teal-700' }
  ];

  // Add appropriate dashboard/login item based on authentication state
  if (authenticated) {
    if (adminUser) {
      menuItems.push({ 
        path: '/admin-dashboard', 
        label: 'Admin Dashboard', 
        icon: Shield,
        color: 'from-purple-700 to-purple-800'
      });
    } else {
      menuItems.push({ 
        path: '/user-dashboard', 
        label: 'User Dashboard', 
        icon: User,
        color: 'from-blue-700 to-blue-800'
      });
    }
  } else {
    menuItems.push({ 
      path: '/login', 
      label: 'Login', 
      icon: UserCheck,
      color: 'from-gray-600 to-gray-700'
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-church-primary/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-church-primary via-church-secondary to-church-accent rounded-t-3xl shadow-divine border-t-2 border-church-gold/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header with cross decoration */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              {/* Sacred cross */}
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-church-gold/30 rounded-sm">
                  <div className="w-1.5 h-8 bg-church-gold mx-auto"></div>
                  <div className="w-8 h-1.5 bg-church-gold absolute top-2 left-0"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold font-serif">
                <span className="divine-text">Navigation</span>
              </h2>
            </div>
            
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-church-gold to-church-lightGold rounded-full shadow-divine hover:shadow-glow transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-church-primary group-hover:text-church-secondary transition-colors duration-300" />
            </motion.button>
          </div>

          {/* Menu items with enhanced styling */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isDashboardOrLogin = item.label.includes('Dashboard') || item.label === 'Login';
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={isDashboardOrLogin ? 'col-span-2 flex justify-center' : ''}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`group relative flex flex-col items-center p-6 sacred-card hover:scale-105 transition-all duration-300 ${
                      isDashboardOrLogin ? 'w-64' : 'w-full'
                    }`}
                  >
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-sacred group-hover:shadow-divine transition-all duration-300 sacred-icon`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Label with enhanced typography */}
                    <span className="text-church-primary font-body font-semibold text-center group-hover:text-church-accent transition-colors duration-300">
                      {item.label}
                    </span>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-church-gold/5 to-church-lightGold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Sacred footer */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-0.5 bg-church-gold rounded-full"></div>
              <div className="w-2 h-2 bg-church-gold rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-church-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navigation;