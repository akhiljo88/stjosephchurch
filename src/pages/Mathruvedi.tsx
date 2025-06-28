import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Flower } from 'lucide-react';

const Mathruvedi: React.FC = () => {
  const mothersPhotos = [
    "https://images.pexels.com/photos/8613264/pexels-photo-8613264.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613066/pexels-photo-8613066.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613095/pexels-photo-8613095.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
  ];

  const activities = [
    { title: "Prayer Groups", icon: Heart, description: "Regular prayer meetings for spiritual growth and mutual support" },
    { title: "Family Support", icon: Users, description: "Supporting families through counseling and community assistance" },
    { title: "Bible Study", icon: BookOpen, description: "Deepening faith through Scripture study and reflection" },
    { title: "Community Service", icon: Flower, description: "Serving the community through various charitable activities" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6 font-serif">Mathruvedi</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            Supporting mothers in their spiritual journey while strengthening family and community bonds through prayer and fellowship.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12 font-serif">Our Mothers in Faith</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mothersPhotos.map((photo, index) => (
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
                  alt={`Mothers Activity ${index + 1}`}
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
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12 font-serif">Our Activities</h2>
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
                  className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-xl p-8 border-4 border-purple-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 font-serif">{activity.title}</h3>
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
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl shadow-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 font-serif">Mothers' Videos & Testimonials</h2>
          <p className="text-purple-100 text-lg font-serif mb-8">
            Watch inspiring testimonials and stories from our mothers as they share their faith journey and experiences in Mathruvedi.
          </p>
          <div className="bg-white p-8 rounded-2xl">
            <p className="text-purple-900 font-semibold font-serif">Video content featuring our mothers' testimonials and activities will be added here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mathruvedi;