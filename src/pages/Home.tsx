import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import SocialMedia from '../components/SocialMedia';
import Copyright from '../components/Copyright';

const Home: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-church-cream via-church-pearl to-sacred-cream">
      <Header onMenuClick={() => setIsNavOpen(true)} />
      <AnimatePresence>
        {isNavOpen && (
          <Navigation onClose={() => setIsNavOpen(false)} />
        )}
      </AnimatePresence>

      {/* Background with Christian pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("/church.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-church-primary/80 via-church-secondary/70 to-church-accent/80"></div>
        <div className="absolute inset-0 bg-christian-pattern"></div>
      </div>

      {/* Floating Christian symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          >
            {/* Christian Cross */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-church-gold/30 rounded-sm transform rotate-0">
                <div className="w-2 h-8 bg-church-gold/50 mx-auto"></div>
                <div className="w-8 h-2 bg-church-gold/50 absolute top-2 left-0"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        {/* Sacred Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 mx-auto">
            {/* Outer ring with divine glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-church-gold via-church-lightGold to-church-gold animate-cross-glow"></div>
            
            {/* Inner sacred space */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sacred-white via-church-cream to-sacred-white shadow-divine flex items-center justify-center">
              {/* St. Joseph image with enhanced styling */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-church-gold/50 shadow-sacred">
                <img 
                  src="/st-joseph.png" 
                  alt="St. Joseph" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-church-gold/10"></div>
              </div>
            </div>
            
            {/* Decorative cross elements */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-church-gold rounded-full shadow-glow"></div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-12 h-4 bg-church-gold rounded-full shadow-glow"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-12 h-4 bg-church-gold rounded-full shadow-glow"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-church-gold rounded-full shadow-glow"></div>
          </div>
        </motion.div>

        {/* Sacred greeting */}
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-church-lightGold text-xl font-script italic mb-6 text-shadow-divine"
        >
          In the name of the Father, and of the Son, and of the Holy Spirit
        </motion.p>

        {/* Main title with divine styling */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 font-serif tracking-wide"
        >
          <span className="divine-text text-shadow-divine">
            St. Joseph's Church
          </span>
        </motion.h1>

        {/* Location with elegant styling */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="text-3xl md:text-4xl text-church-lightGold font-serif mb-8 tracking-wider text-shadow"
        >
          Arabi
        </motion.p>

        {/* Sacred verse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mb-12 max-w-2xl"
        >
          <div className="glass-effect rounded-2xl p-6 border border-church-gold/30">
            <p className="text-church-lightGold text-lg font-body italic leading-relaxed">
              "Be it done unto me according to thy word"
            </p>
            <p className="text-church-gold text-sm font-body mt-2 opacity-80">
              - Luke 1:38
            </p>
          </div>
        </motion.div>

        {/* Enhanced Social Media */}
        <SocialMedia />

        {/* Sacred scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="w-1 h-20 bg-gradient-to-b from-church-gold via-church-lightGold to-transparent rounded-full shadow-glow"></div>
            <div className="mt-2 w-3 h-3 bg-church-gold rounded-full animate-pulse shadow-glow"></div>
          </motion.div>
        </motion.div>
      </div>
      
      <Copyright />
    </div>
  );
};

export default Home;