import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, Heart, Cross, Flower } from 'lucide-react';

const SpecialEvents: React.FC = () => {
  const specialEvents = [
    {
      title: "Church Festival",
      date: "March 19, 2026",
      time: "6:00 AM - 10:00 PM",
      description: "Annual church festival celebrating our patron saint with special masses, cultural programs, and community feast.",
      icon: Star,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Easter",
      date: "April 12, 2026",
      time: "6:00 AM - 8:00 PM",
      description: "The most sacred celebration of Christ's resurrection with special vigil mass and Easter celebrations.",
      icon: Heart,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Palm Sunday",
      date: "April 5, 2026",
      time: "7:00 AM - 12:00 PM",
      description: "Commemoration of Jesus' triumphant entry into Jerusalem with palm procession and special mass.",
      icon: Flower,
      color: "from-green-600 to-green-700"
    },
    {
      title: "Good Friday",
      date: "April 10, 2026",
      time: "3:00 PM - 6:00 PM",
      description: "Solemn commemoration of Christ's crucifixion with Way of the Cross and Passion service.",
      icon: Cross,
      color: "from-red-600 to-red-700"
    },
    {
      title: "Maundy Thursday",
      date: "April 9, 2026",
      time: "7:00 PM - 9:00 PM",
      description: "Holy Thursday mass commemorating the Last Supper with washing of feet ceremony.",
      icon: Heart,
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Christmas",
      date: "December 25, 2025",
      time: "12:00 AM - 11:59 PM",
      description: "Celebration of Christ's birth with midnight mass, carol service, and Christmas festivities.",
      icon: Star,
      color: "from-red-500 to-green-500"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 font-serif">Special Events</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            Join us for these sacred celebrations and special occasions throughout the liturgical year.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 group"
              >
                <div className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-20 h-20 bg-gradient-to-br ${event.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:shadow-2xl`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-blue-900 mb-3 font-serif text-center">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center text-amber-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold font-serif">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-center text-amber-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-semibold font-serif">{event.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed font-serif text-center text-sm">{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl shadow-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-amber-100 mb-6 font-serif">Join Our Celebrations</h2>
          <p className="text-amber-200 text-lg font-serif mb-8 max-w-3xl mx-auto">
            These special events are the highlights of our liturgical calendar. Come and experience the joy, 
            reverence, and community spirit that make each celebration memorable and meaningful.
          </p>
          <div className="bg-amber-100 px-8 py-4 rounded-full inline-block">
            <span className="text-blue-900 font-bold font-serif">All Are Welcome to Celebrate</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpecialEvents;