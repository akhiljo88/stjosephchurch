import React from 'react';
import { motion } from 'framer-motion';

const Copyright: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="bg-gradient-to-r from-red-900 to-red-800 py-6 mt-16"
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-amber-200 font-serif">
          © {new Date().getFullYear()} St. Joseph's Church, Arabi. All rights reserved.
        </p>
        <p className="text-amber-300 text-sm mt-2 font-serif">
          Built with faith and love for our community
        </p>
      </div>
    </motion.footer>
  );
};

export default Copyright;