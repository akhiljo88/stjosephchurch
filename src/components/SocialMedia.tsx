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
      action: () => window.open('https://wa.me/9400062714?text=Hello%20St.%20Joseph%27s%20Church%20Arabi', '_blank')
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
      transition={{ delay: 1.2, duration: 0.8 }}
      className="flex justify-center space-x-6 mt-8"
    >
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <motion.button
            key={social.label}
            onClick={social.action}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
            className={`relative p-4 bg-gradient-to-br ${social.color} rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group`}
            style={{
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
              transform: 'perspective(1000px) rotateX(10deg)'
            }}
          >
            <IconComponent className="w-8 h-8 text-white" />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
            >
              {social.label}
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default SocialMedia;