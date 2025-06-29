import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Church, Users, Heart, Star } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const OurHistory: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const timelineEvents = [
    {
      year: 1892,
      title: "Foundation Stone Laid",
      description: "The foundation stone of St. Joseph's Church was laid by Bishop Thomas, marking the beginning of our spiritual journey.",
      icon: Church
    },
    {
      year: 1895,
      title: "First Holy Mass",
      description: "Father Michael celebrated the first Holy Mass in the newly constructed church, blessing the community.",
      icon: Star
    },
    {
      year: 1912,
      title: "Bell Tower Completed",
      description: "The iconic bell tower was completed, becoming a landmark that called faithful to prayer for miles around.",
      icon: Church
    },
    {
      year: 1956,
      title: "Parish School Established",
      description: "St. Joseph's Parish School was established to provide Christian education to the children of the community.",
      icon: Users
    },
    {
      year: 1985,
      title: "Church Renovation",
      description: "Major renovation and modernization of the church facilities while preserving its historical charm and character.",
      icon: Heart
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
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Our History</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </motion.div>

          <div className="relative mb-16">
            {/* Vertical timeline line positioned at 1/4 from left */}
            <div className="absolute left-1/4 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-800 via-amber-400 to-red-800"></div>
            
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              
              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                  className="relative flex items-center mb-16 flex-row"
                >
                  {/* Content positioned to the right of timeline */}
                  <div className="w-3/4 pl-12 text-left">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-xl border-2 border-amber-200">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-amber-100" />
                        </div>
                        <h3 className="text-2xl font-bold text-red-900 font-serif">{event.year}</h3>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3 font-serif">{event.title}</h4>
                      <p className="text-gray-700 leading-relaxed font-serif">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot positioned at 1/4 from left */}
                  <div className="absolute left-1/4 transform -translate-x-1/2 w-6 h-6 bg-amber-400 rounded-full border-4 border-red-800 shadow-lg"></div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-12 border-4 border-amber-200"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl">
                <Calendar className="w-10 h-10 text-amber-100" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-red-900 mb-8 font-serif">A Legacy of Faith</h2>
            
            <div className="prose prose-lg prose-amber max-w-none">
              <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif text-center">
                For over a century, St. Joseph's Church has stood as a testament to the enduring power of faith and community. 
                Our rich history is woven with countless stories of devotion, service, and spiritual growth. From humble beginnings 
                in the late 19th century, our church has grown to become a cornerstone of the Arabi community, touching the lives 
                of generations of faithful parishioners.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-lg font-serif text-center">
                Throughout the decades, we have weathered storms both literal and metaphorical, always emerging stronger 
                in our commitment to serve God and our neighbors. Our church has been a place of baptisms and confirmations, 
                weddings and funerals, celebrations and solace. Each stone in our walls holds memories of prayers offered, 
                songs sung, and lives transformed by the grace of God. As we look toward the future, we carry forward the 
                traditions and values that have sustained us, while embracing new opportunities to serve our community and 
                spread Christ's message of love to all who enter our doors.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default OurHistory;