import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Heart } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900/95 to-red-800/95 backdrop-blur-sm border-b-2 border-amber-400"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-red-800" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-amber-100 font-serif tracking-wide">
              St. Joseph's Church
            </h1>
            <p className="text-amber-200 text-xs md:text-sm font-light">Arabi</p>
          </div>
        </motion.div>

        <motion.button
          onClick={onMenuClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-amber-100 hover:bg-amber-200 rounded-full shadow-lg transition-colors duration-300"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-red-800" />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;