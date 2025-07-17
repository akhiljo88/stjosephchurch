import React from 'react';
import { motion } from 'framer-motion';

const Copyright: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="bg-gradient-to-r from-church-primary via-church-secondary to-church-primary py-8 mt-20 border-t border-church-gold/20"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Sacred divider */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-16 h-0.5 bg-church-gold"></div>
          <div className="mx-4 w-6 h-6 relative">
            <div className="absolute inset-0 bg-church-gold/30 rounded-sm">
              <div className="w-1 h-6 bg-church-gold mx-auto"></div>
              <div className="w-6 h-1 bg-church-gold absolute top-2 left-0"></div>
            </div>
          </div>
          <div className="w-16 h-0.5 bg-church-gold"></div>
        </div>
        
        {/* Main copyright text */}
        <p className="text-church-lightGold font-body text-lg mb-2">
          © {new Date().getFullYear()} St. Joseph's Church, Arabi. All rights reserved.
        </p>
        
        {/* Sacred message */}
        <p className="text-church-gold text-sm font-body italic mb-4">
          Built with faith, love, and devotion for our blessed community
        </p>
        
        {/* Biblical verse */}
        <div className="glass-effect rounded-xl p-4 max-w-md mx-auto border border-church-gold/20">
          <p className="text-church-lightGold text-sm font-body italic leading-relaxed">
            "For where two or three gather in my name, there am I with them."
          </p>
          <p className="text-church-gold text-xs font-body mt-1 opacity-80">
            - Matthew 18:20
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-church-gold rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-church-lightGold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-church-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Copyright;