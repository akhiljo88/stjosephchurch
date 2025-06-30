import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, Bell, Heart } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const Events: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const massTimings = [
    { day: "Sunday", timings: ["8:00 AM", "10:15 AM"], special: "Student Mass at 10:15 AM" },
    { day: "Monday - Saturday", timings: ["6:30 AM"], special: "Friday Evening at 4:30 PM" },
    { day: "First Friday", timings: ["4:00 PM"], special: "Adoration" },
    { day: "Second Sunday", timings: ["9:30 AM"], special: "Parish Council Meeting" }
  ];

  const upcomingEvents = [
    {
      title: "Christmas Celebration",
      date: "December 25, 2025",
      time: "Midnight Mass at 12:00 AM",
      description: "Join us for the joyous celebration of Christ's birth with midnight mass and festivities.",
      icon: Star,
      color: "from-red-600 to-red-700"
    },
    {
      title: "New Year Prayer Service",
      date: "December 31, 2025",
      time: "11:00 PM - 12:30 AM",
      description: "End the year with thanksgiving and begin the new year with blessings.",
      icon: Bell,
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Feast of St. Joseph",
      date: "March 19, 2026",
      time: "6:30 AM",
      description: "Special celebration honoring our patron saint with festive masses and community gathering.",
      icon: Heart,
      color: "from-amber-600 to-amber-700"
    },
    {
      title: "Easter Resurrection",
      date: "April 12, 2026",
      time: "3:00 AM",
      description: "The most sacred celebration of the Church - Christ's resurrection from the dead.",
      icon: Star,
      color: "from-green-600 to-green-700"
    },
    {
      title: "Parish Annual Retreat",
      date: "March, 2026",
      time: "4:00 PM - 9:00 PM",
      description: "Four-day spiritual retreat for deepening faith and community bonding.",
      icon: Calendar,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Church Festival",
      date: "February, 2026",
      time: "4:00 PM - 8:00 PM",
      description: "Annual celebration featuring prayers, novenas, performances, and fellowship.",
      icon: Heart,
      color: "from-pink-600 to-pink-700"
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
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Events & Timings</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
              Join us for worship, celebration, and community gathering. Mark your calendars for these special occasions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Mass Timings</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {massTimings.map((timing, index) => (
                <motion.div
                  key={timing.day}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl p-8 border-4 border-amber-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-amber-100" />
                    </div>
                    <h3 className="text-xl font-bold text-red-900 font-serif">{timing.day}</h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {timing.timings.map((time, timeIndex) => (
                      <div key={timeIndex} className="bg-amber-100 px-4 py-2 rounded-lg">
                        <span className="text-red-900 font-semibold font-serif">{time}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-amber-600 font-medium italic font-serif">{timing.special}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1 + index * 0.15, duration: 0.8 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="p-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`w-20 h-20 bg-gradient-to-br ${event.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:shadow-2xl`}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-red-900 mb-3 font-serif text-center">{event.title}</h3>
                      
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            onClick={() => window.open('https://maps.google.com/?q=St+Josephs+Church+Arabi', '_blank')}
            className="mt-16 bg-gradient-to-br from-red-800 to-red-900 rounded-3xl shadow-2xl p-12 text-center cursor-pointer hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-red-900" />
            </div>
            <h2 className="text-3xl font-bold text-amber-100 mb-6 font-serif">Visit Us</h2>
            <p className="text-amber-200 text-lg font-serif mb-6 max-w-3xl mx-auto">
              St. Joseph's Church, Arabi - A place where all are welcome to worship, 
              celebrate, and grow in faith together. Join us for any of our services or events.
            </p>
            <div className="bg-amber-100 px-8 py-4 rounded-full inline-block">
              <span className="text-red-900 font-bold font-serif">Click to View on Google Maps</span>
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Events;