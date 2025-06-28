import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, HandHeart, Baby } from 'lucide-react';

const HolyCommunities: React.FC = () => {
  const navigate = useNavigate();

  const communities = [
    {
      name: "KCYM",
      description: "Kerala Catholic Youth Movement - Empowering young Catholics through faith formation, leadership development, and community service.",
      icon: Users,
      color: "from-blue-600 to-blue-700",
      path: "/kcym-arabi-unit",
      image: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
    },
    {
      name: "Mission League",
      description: "Cherupushpa Mission League - Nurturing young hearts in faith and service through engaging activities and spiritual formation.",
      icon: Baby,
      color: "from-pink-600 to-pink-700",
      path: "/cherupushpa-mission-league",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
    },
    {
      name: "TSSS",
      description: "Thalassery Social Service Society - Serving the needy and marginalized through various charitable activities and community outreach.",
      icon: HandHeart,
      color: "from-green-600 to-green-700",
      path: "/thalassery-social-service",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
    },
    {
      name: "Mathruvedi",
      description: "Supporting mothers in their spiritual journey while strengthening family and community bonds through prayer and fellowship.",
      icon: Heart,
      color: "from-purple-600 to-purple-700",
      path: "/mathruvedi",
      image: "https://images.pexels.com/photos/8613264/pexels-photo-8613264.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
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
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 font-serif">Holy Communities</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            Our vibrant communities bring together people of all ages to grow in faith, serve others, and build lasting friendships in Christ.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {communities.map((community, index) => {
            const IconComponent = community.icon;
            return (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(community.path)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <motion.div 
                    className="absolute top-4 right-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${community.color} rounded-full flex items-center justify-center shadow-xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-amber-100 font-bold rounded-full shadow-lg transition-all duration-300 font-serif text-lg"
                  >
                    {community.name}
                  </motion.button>
                  <p className="text-gray-700 leading-relaxed font-serif text-center">{community.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl shadow-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-amber-100 mb-6 font-serif">Join a Community</h2>
          <p className="text-amber-200 text-lg font-serif mb-8 max-w-3xl mx-auto">
            Find your place in our church family. Each community offers unique opportunities for growth, 
            service, and fellowship. Join us and discover how you can make a difference.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              className="bg-amber-100 p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-blue-900 font-bold mb-2 font-serif">Weekly Meetings</h3>
              <p className="text-blue-800 text-sm font-serif">Regular gatherings for prayer and fellowship</p>
            </motion.div>
            <motion.div 
              className="bg-amber-100 p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-blue-900 font-bold mb-2 font-serif">Service Projects</h3>
              <p className="text-blue-800 text-sm font-serif">Opportunities to serve our community</p>
            </motion.div>
            <motion.div 
              className="bg-amber-100 p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-blue-900 font-bold mb-2 font-serif">Spiritual Growth</h3>
              <p className="text-blue-800 text-sm font-serif">Deepen your relationship with God</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HolyCommunities;