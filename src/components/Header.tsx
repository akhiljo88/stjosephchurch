import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-church-gold/20"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        <motion.div 
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Sacred logo with cross */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-church-gold to-church-lightGold rounded-full flex items-center justify-center shadow-divine overflow-hidden border-2 border-church-gold/30">
              <img 
                src="/st-joseph.png" 
                alt="St. Joseph" 
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            {/* Small cross overlay */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-gold rounded-full flex items-center justify-center shadow-glow">
              <div className="w-2 h-2">
                <div className="w-0.5 h-2 bg-church-primary mx-auto"></div>
                <div className="w-2 h-0.5 bg-church-primary absolute top-0.5 left-1"></div>
              </div>
            </div>
          </div>
          
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide">
              <span className="divine-text">St. Joseph's Church</span>
            </h1>
            <p className="text-church-gold text-xs md:text-sm font-body font-medium opacity-90">
              Arabi • Est. 1892
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={onMenuClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 bg-gradient-to-br from-church-gold to-church-lightGold rounded-full shadow-divine hover:shadow-glow transition-all duration-300 group"
        >
          <Menu className="w-6 h-6 text-church-primary group-hover:text-church-secondary transition-colors duration-300" />
          
          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-full border-2 border-church-gold/30 group-hover:border-church-gold/60 transition-colors duration-300"></div>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;