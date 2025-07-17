import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-28 left-6 z-40 p-3 bg-gradient-to-br from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <Home className="w-6 h-6" />
    </motion.button>
  );
};

export default HomeButton;