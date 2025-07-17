import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react';

const SocialMedia: React.FC = () => {
  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      color: 'from-purple-600 to-pink-600',
      action: () => window.open('https://www.instagram.com/kcym_arabi_unit/', '_blank')
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'from-green-500 to-green-600',
      action: () => window.open('https://wa.me/+919400062714?text=Hello%20St.%20Joseph%27s%20Church%20Arabi', '_blank')
    },
    {
      icon: Mail,
      label: 'Gmail',
      color: 'from-red-500 to-red-600',
      action: () => window.open('mailto:akhiljose060@gmail.com', '_blank')
    },
    {
      icon: Phone,
      label: 'Phone',
      color: 'from-blue-500 to-blue-600',
      action: () => window.open('tel:8129201658', '_blank')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="flex justify-center space-x-8 mt-8"
    >
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <motion.button
            key={social.label}
            onClick={social.action}
            whileHover={{ scale: 1.2, y: -15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              delay: 2 + index * 0.15, 
              type: "spring", 
              stiffness: 200,
              duration: 0.8
            }}
            className={`relative p-5 bg-gradient-to-br ${social.color} rounded-2xl shadow-divine hover:shadow-glow transition-all duration-300 group overflow-hidden`}
          >
            {/* Background shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <IconComponent className="w-8 h-8 text-white relative z-10" />
            
            {/* Enhanced tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 glass-effect text-church-gold px-4 py-2 rounded-xl text-sm whitespace-nowrap font-body font-medium border border-church-gold/30"
            >
              {social.label}
              {/* Arrow pointing up */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-church-gold/20 rotate-45 border-l border-t border-church-gold/30"></div>
            </motion.div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/20 rounded-full"></div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default SocialMedia;