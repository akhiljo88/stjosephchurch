import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Users, FileText, Settings, BookOpen, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const AdminPanel: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const leadership = [
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

  const managementTeam = [
    {
      name: "Viju Orappankuzhymattathil",
      designation: "Kaikkaran",
      icon: Settings,
      image: "/images/viju.jpg"
    },
    {
      name: "Baby Ezhuthupally",
      designation: "Kaikkaran",
      icon: Settings,
      image: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
    },
    {
      name: "Shaju Nellikkal",
      designation: "Kaikkaran",
      icon: Settings,
      image: "/images/shaju.jpg"
    },
    {
      name: "Mathew Nadakkal",
      designation: "Kaikkaran",
      icon: Settings,
      image: "/images/mathew.jpg"
    },
    {
      name: "Shine Makkanal",
      designation: "Chief Internal Auditor",
      icon: BookOpen,
      image: "/images/shine.jpg"
    },
    {
      name: "Sunny Nadakkal",
      designation: "Sunday School Headmaster",
      icon: GraduationCap,
      image: "/images/sunny.jpg"
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
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Our Admin Panel</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Church Leadership</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => {
                const IconComponent = leader.icon;
                return (
                  <motion.div
                    key={leader.name}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={leader.image}
                        alt={leader.name}
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
                      <h3 className="text-2xl font-bold text-red-900 mb-2 font-serif">{leader.name}</h3>
                      <p className="text-amber-600 font-semibold text-lg font-serif">{leader.designation}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Management Team</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
              {managementTeam.map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1 + index * 0.15, duration: 0.8 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-lg">
                          <IconComponent className="w-5 h-5 text-amber-100" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-red-900 mb-1 font-serif">{member.name}</h3>
                      <p className="text-amber-600 font-medium text-sm font-serif">{member.designation}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default AdminPanel;