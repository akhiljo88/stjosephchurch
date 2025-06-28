import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import SocialMedia from '../components/SocialMedia';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("/src/assets/church.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-300/40 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="w-40 h-40 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 border-4 border-amber-300 overflow-hidden">
            <img 
              src="/src/assets/st-joseph.png" 
              alt="St. Joseph" 
              className="w-36 h-36 object-cover rounded-full"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-amber-200 text-lg font-light italic mb-4 font-body"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold text-amber-100 mb-8 font-serif tracking-wide"
          style={{
            textShadow: '4px 4px 8px rgba(0,0,0,0.7), 0 0 20px rgba(212, 165, 116, 0.3)',
            background: 'linear-gradient(45deg, #F5F2E8, #D4A574, #F5F2E8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          St. Joseph's Church
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-2xl md:text-3xl text-amber-300 font-serif mb-12 tracking-wider"
        >
          Arabi
        </motion.p>

        <SocialMedia />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
          >
            <LogIn className="w-6 h-6 mr-3" />
            Login
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-16 bg-gradient-to-b from-amber-300 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;