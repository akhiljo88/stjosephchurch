import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/')}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed top-28 left-6 z-40 group"
    >
      <div className="relative p-4 bg-gradient-to-br from-church-gold to-church-lightGold rounded-2xl shadow-divine hover:shadow-glow transition-all duration-300 overflow-hidden">
        {/* Background shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <Home className="w-6 h-6 text-church-primary relative z-10" />
        
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-church-gold/30 group-hover:border-church-gold/60 transition-colors duration-300"></div>
        
        {/* Sacred cross accent */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-church-primary rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5">
            <div className="w-0.5 h-1.5 bg-church-gold mx-auto"></div>
            <div className="w-1.5 h-0.5 bg-church-gold absolute top-0.5 left-0"></div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default HomeButton;