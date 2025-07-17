import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Crown, FileText, UserCheck } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const Administration: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const administrators = [
    {
      name: "Fr. Edwin Koyippuram",
      designation: "Vicar",
      icon: Crown,
      image: "/images/fredwin.jpg"
    },
    {
      name: "James Palakkunnel",
      designation: "Coordinator",
      icon: Users,
      image: "/images/james.jpg"
    },
    {
      name: "Akhil Jose Oottusalayil",
      designation: "Secretary",
      icon: FileText,
      image: "/images/3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header onMenuClick={() => setIsNavOpen(true)} />
      <AnimatePresence>
        {isNavOpen && (
          <Navigation onClose={() => setIsNavOpen(false)} />
        )}
      </AnimatePresence>
      <HomeButton />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Our Administration</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            
            {/* Bible Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 mt-8 mb-8 max-w-3xl mx-auto border-2 border-amber-200"
            >
              <blockquote className="text-red-900 text-lg font-serif italic text-center mb-3">
                "Obey your leaders and submit to their authority."
              </blockquote>
              <p className="text-amber-600 text-sm font-serif text-center">- Hebrews 13:17</p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {administrators.map((admin, index) => {
              const IconComponent = admin.icon;
              return (
                <motion.div
                  key={admin.name}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={admin.image}
                      alt={admin.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 text-amber-100" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-red-900 mb-2 font-serif">{admin.name}</h3>
                    <p className="text-amber-600 font-semibold text-lg font-serif">{admin.designation}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={() => navigate('/admin-panel')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-serif text-lg"
            >
              <UserCheck className="w-6 h-6 mr-3" />
              Full Panel
            </button>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Administration;