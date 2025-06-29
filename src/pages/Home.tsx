import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import SocialMedia from '../components/SocialMedia';
import Copyright from '../components/Copyright';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/161901/paris-france-church-sainte-chapelle-161901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 border-4 border-amber-300">
            <Heart className="w-20 h-20 text-red-800" fill="currentColor" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-amber-200 text-lg font-light italic mb-4 font-serif"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
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
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-2xl md:text-3xl text-amber-300 font-serif mb-12 tracking-wider"
        >
          Arabi
        </motion.p>

        <SocialMedia />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-16 bg-gradient-to-b from-amber-300 to-transparent rounded-full"
          />
        </motion.div>
      </div>
      <Copyright />
    </div>
  );
};

export default Home;