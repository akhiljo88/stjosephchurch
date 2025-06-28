import React from 'react';
import { motion } from 'framer-motion';
import { Menu, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-sm border-b-2 border-gold-400"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img 
              src="/src/assets/st-joseph.png" 
              alt="St. Joseph" 
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-amber-100 font-serif tracking-wide">
              St. Joseph's Church
            </h1>
            <p className="text-amber-200 text-sm font-light">Arabi</p>
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-full shadow-lg transition-colors duration-300"
          >
            <LogIn className="w-5 h-5 text-blue-800 mr-2" />
            <span className="text-blue-800 font-semibold font-serif">Login</span>
          </motion.button>

          <motion.button
            onClick={onMenuClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-amber-100 hover:bg-amber-200 rounded-full shadow-lg transition-colors duration-300"
          >
            <Menu className="w-6 h-6 text-blue-800" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;