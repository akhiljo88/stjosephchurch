import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Home, Users, Settings, Church, Heart, Calendar, Phone, UserCheck } from 'lucide-react';

interface NavigationProps {
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onClose }) => {
  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Us', icon: Church },
    { path: '/administration', label: 'Administration', icon: Users },
    { path: '/services', label: 'Our Services', icon: Heart },
    { path: '/holy-communities', label: 'Holy Communities', icon: Users },
    { path: '/families', label: 'Our Families', icon: Heart },
    { path: '/events', label: 'Events & Timings', icon: Calendar },
    { path: '/contact', label: 'Connect With Us', icon: Phone },
    { path: '/login', label: 'Login', icon: UserCheck }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-900 via-red-800 to-red-700 rounded-t-3xl shadow-2xl border-t-4 border-amber-400"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-100 font-serif">Navigation</h2>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors duration-300 shadow-lg"
            >
              <X className="w-6 h-6 text-red-800" />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-100/20 to-amber-200/20 hover:from-amber-100/30 hover:to-amber-200/30 rounded-xl border border-amber-400/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    <IconComponent className="w-8 h-8 text-amber-300 mb-2" />
                    <span className="text-amber-100 text-sm font-medium text-center font-serif">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="w-12 h-1 bg-amber-300 rounded-full mx-auto"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navigation;