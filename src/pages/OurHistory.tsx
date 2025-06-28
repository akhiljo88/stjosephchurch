import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Church, Users, Heart, Star } from 'lucide-react';

const OurHistory: React.FC = () => {
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
    <div 
      className="min-h-screen pt-24 pb-12 px-6 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4a574' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundColor: '#f5f2e8'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/90 to-amber-100/90"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 font-serif">Our History</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-800 via-amber-400 to-blue-800"></div>
          
          {timelineEvents.map((event, index) => {
            const IconComponent = event.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: isEven ? -100 : 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className={`relative flex items-center mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <motion.div 
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-xl border-2 border-amber-200"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center mr-4 ${!isEven ? 'order-2 ml-4 mr-0' : ''}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-6 h-6 text-amber-100" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-blue-900 font-serif">{event.year}</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3 font-serif">{event.title}</h4>
                    <p className="text-gray-700 leading-relaxed font-serif">{event.description}</p>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-400 rounded-full border-4 border-blue-800 shadow-lg"
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                ></motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* History Description */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-12 border-4 border-amber-200"
        >
          <div className="flex justify-center mb-8">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calendar className="w-10 h-10 text-amber-100" />
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8 font-serif">A Legacy of Faith</h2>
          
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
  );
};

export default OurHistory;