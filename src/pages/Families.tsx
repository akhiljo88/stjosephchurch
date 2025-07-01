import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Home, Users, Baby, GraduationCap, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const Families: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const familyPrograms = [
    {
      title: "Family Prayer Night",
      description: "Monthly gatherings where families come together for prayer, sharing, and fellowship.",
      icon: Heart,
      color: "from-red-600 to-red-700",
      schedule: "Monthly"
    },
    {
      title: "Marriage Preparation",
      description: "Comprehensive program for couples preparing for the sacrament of marriage.",
      icon: Home,
      color: "from-pink-600 to-pink-700",
      schedule: "By Appointment"
    },
    {
      title: "Parish Council Meetings",
      description: "Meeting of Parish Council members to discuss and analyse Church activities and Accounts.",
      icon: Users,
      color: "from-blue-600 to-blue-700",
      schedule: "Monthly"
    },
    {
      title: "Holy Communion Classes",
      description: "Preparation classes for students preparing for their First Holy Communion.",
      icon: Baby,
      color: "from-green-600 to-green-700",
      schedule: "Yearly"
    },
    {
      title: "Sunday School",
      description: "Religious education for children of all ages to grow in faith.",
      icon: GraduationCap,
      color: "from-purple-600 to-purple-700",
      schedule: "Every Sunday after 10:15 AM Mass"
    },
    {
      title: "Family Retreats",
      description: "Annual retreats designed to strengthen family bonds and deepen faith.",
      icon: Calendar,
      color: "from-amber-600 to-amber-700",
      schedule: "Annual summer retreat"
    }
  ];

  const familyStats = [
    { number: "128", label: "Registered Families", icon: Home },
    { number: "60+", label: "Children in Sunday School", icon: GraduationCap },
    { number: "50+", label: "Marriages Blessed", icon: Heart },
    { number: "5+", label: "Baptisms This Year", icon: Baby }
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
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Our Families</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
              St. Joseph's Church is a place where families are nurtured, supported, and celebrated. 
              We offer programs and services designed to strengthen family bonds and deepen faith together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid md:grid-cols-4 gap-6 mb-16"
          >
            {familyStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-6 text-center shadow-xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <IconComponent className="w-8 h-8 text-red-900" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-amber-100 mb-2 font-serif">{stat.number}</h3>
                  <p className="text-amber-200 font-serif">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Family Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {familyPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.15, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-20 h-20 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:shadow-2xl`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-red-900 mb-4 font-serif text-center">{program.title}</h3>
                    <p className="text-gray-700 leading-relaxed font-serif text-center mb-4">{program.description}</p>
                    
                    <div className="bg-amber-100 px-4 py-2 rounded-full text-center">
                      <span className="text-red-900 text-sm font-semibold font-serif">{program.schedule}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-12 border-4 border-amber-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-900 mb-6 font-serif">A Church Family</h2>
              <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
                <Heart className="w-10 h-10 text-amber-100" fill="currentColor" />
              </div>
            </div>
            
            <blockquote className="text-gray-800 text-lg leading-relaxed font-serif text-center max-w-4xl mx-auto mb-8">
              "St. Joseph's Church has been our spiritual home for over two decades. Here, our children learned the values of faith, 
              compassion, and service. The church community supported us through life's joys and challenges, making us feel truly 
              blessed to be part of this wonderful family."
            </blockquote>
            
            <div className="text-center">
              <p className="text-red-900 font-semibold font-serif">- The Palakkunnel Family</p>
              <p className="text-amber-600 font-serif">Long-time parishioners</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Families;