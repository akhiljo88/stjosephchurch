import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

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
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4a574" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          >
            <div className="absolute inset-0 border-8 border-amber-300/30 rounded-3xl pointer-events-none"></div>
            <div className="absolute inset-4 border-4 border-amber-400/20 rounded-2xl pointer-events-none"></div>

            <div className="relative p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl">
                  <BookOpen className="w-10 h-10 text-amber-100" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-center text-red-900 mb-8 font-serif"
              >
                About Us
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="prose prose-lg prose-amber max-w-none text-center"
              >
                <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                  St. Joseph's Church in Arabi stands as a beacon of faith and community, 
                  serving our parishioners with unwavering dedication since its establishment. 
                  Our church is more than a place of worship; it is a spiritual home where 
                  families gather to celebrate their faith, seek solace, and build lasting 
                  relationships with God and each other.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6 text-lg font-serif">
                  Named after Saint Joseph, the foster father of Jesus and patron saint of 
                  workers and families, our church embodies the values of humility, 
                  dedication, and protective love. We strive to follow in his footsteps, 
                  creating a nurturing environment where all are welcome to experience 
                  God's love and grace.
                </p>

                <p className="text-gray-700 leading-relaxed mb-8 text-lg font-serif">
                  Our vibrant community includes families from diverse backgrounds, 
                  united in their commitment to Christian values and service to others. 
                  Through various ministries, educational programs, and community outreach 
                  initiatives, we work together to spread Christ's message of love and compassion.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-center"
              >
                <button
                  onClick={() => navigate('/our-history')}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-serif text-lg"
                >
                  <BookOpen className="w-6 h-6 mr-3" />
                  Know More
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default About;