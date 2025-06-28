import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Heart, Star, BookOpen } from 'lucide-react';

const CherupushpaMissionLeague: React.FC = () => {
  const kidsPhotos = [
    "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613264/pexels-photo-8613264.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613066/pexels-photo-8613066.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613095/pexels-photo-8613095.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
  ];

  const activities = [
    { title: "Bible Stories", icon: BookOpen, description: "Teaching children about God's love through engaging Bible stories and activities" },
    { title: "Prayer Time", icon: Heart, description: "Nurturing young hearts in prayer and developing a personal relationship with Jesus" },
    { title: "Creative Arts", icon: Star, description: "Expressing faith through drawing, crafts, and creative activities" },
    { title: "Mission Projects", icon: Baby, description: "Teaching children about service and helping others in need" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-pink-900 mb-6 font-serif">Cherupushpa Mission League</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            Nurturing young hearts in faith and service through engaging activities and spiritual formation.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-pink-900 mb-12 font-serif">Our Little Angels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {kidsPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={photo} 
                  alt={`Kids Activity ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-pink-900 mb-12 font-serif">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-8 border-4 border-pink-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-pink-900 font-serif">{activity.title}</h3>
                  </div>
                  <p className="text-gray-700 font-serif">{activity.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Video Section Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-3xl shadow-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 font-serif">Children's Videos & Activities</h2>
          <p className="text-pink-100 text-lg font-serif mb-8">
            Watch our little ones as they learn, play, and grow in their faith journey through various activities and programs.
          </p>
          <div className="bg-white p-8 rounded-2xl">
            <p className="text-pink-900 font-semibold font-serif">Video content featuring our children's activities will be added here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CherupushpaMissionLeague;