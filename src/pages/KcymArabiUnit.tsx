import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Star, Calendar } from 'lucide-react';

const KcymArabiUnit: React.FC = () => {
  const youthPhotos = [
    "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
  ];

  const activities = [
    { title: "Youth Leadership Training", icon: Star, description: "Developing future leaders through workshops and mentorship programs" },
    { title: "Community Service", icon: Heart, description: "Serving the community through various outreach programs and charity work" },
    { title: "Spiritual Formation", icon: Users, description: "Growing in faith through prayer meetings, retreats, and Bible study" },
    { title: "Cultural Programs", icon: Calendar, description: "Organizing events that celebrate our faith and cultural heritage" }
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
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 font-serif">KCYM Arabi Unit</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            Kerala Catholic Youth Movement - Empowering young Catholics to become leaders in faith and service.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 font-serif">Our Youth in Action</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {youthPhotos.map((photo, index) => (
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
                  alt={`Youth Activity ${index + 1}`}
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
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 font-serif">Our Activities</h2>
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
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl p-8 border-4 border-amber-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-amber-100" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 font-serif">{activity.title}</h3>
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
          className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl shadow-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-amber-100 mb-6 font-serif">Youth Videos & Testimonials</h2>
          <p className="text-amber-200 text-lg font-serif mb-8">
            Watch inspiring stories and testimonials from our youth members as they share their faith journey and experiences.
          </p>
          <div className="bg-amber-100 p-8 rounded-2xl">
            <p className="text-blue-900 font-semibold font-serif">Video content will be added here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KcymArabiUnit;