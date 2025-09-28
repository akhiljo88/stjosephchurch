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
            
            {/* Bible Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 mt-8 mb-8 max-w-3xl mx-auto border-2 border-amber-200"
            >
              <blockquote className="text-red-900 text-lg font-serif italic text-center mb-3">
                "Train up a child in the way he should go; even when he is old he will not depart from it."
              </blockquote>
              <p className="text-amber-600 text-sm font-serif text-center">- Proverbs 22:6</p>
            </motion.div>
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
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    if (stat.label === 'Registered Families') {
                      window.location.href = '/families-directory';
                    }
                  }}
                  className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-6 text-center shadow-xl"
                  style={{ cursor: stat.label === 'Registered Families' ? 'pointer' : 'default' }}
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
                </motion.div>
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
      <div className="bg-gradient-to-r from-red-900 to-red-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6">
            <motion.button
              onClick={() => window.open('https://www.instagram.com/kcym_arabi_unit/', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={() => window.open('https://wa.me/+919400062714?text=Hello%20St.%20Joseph%27s%20Church%20Arabi', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={() => window.open('mailto:akhiljose060@gmail.com', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={() => window.open('tel:8129201658', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Families;