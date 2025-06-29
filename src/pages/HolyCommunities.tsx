import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Star, BookOpen, Music, Hand as Hands } from 'lucide-react';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const HolyCommunities: React.FC = () => {
  const communities = [
    {
      name: "KCYM (Kerala Catholic Youth Movement)",
      description: "Empowering young Catholics through faith formation, leadership development, and community service.",
      icon: Users,
      color: "from-blue-600 to-blue-700",
      activities: ["Youth Leadership", "Social Service", "Faith Formation"]
    },
    {
      name: "Women's Cell",
      description: "Supporting women in their spiritual journey while strengthening family and community bonds.",
      icon: Heart,
      color: "from-pink-600 to-pink-700",
      activities: ["Prayer Groups", "Community Outreach", "Family Support"]
    },
    {
      name: "Men's Fellowship",
      description: "Building brotherhood among men through faith sharing and community involvement.",
      icon: Star,
      color: "from-green-600 to-green-700",
      activities: ["Men's Retreat", "Community Projects", "Spiritual Growth"]
    },
    {
      name: "Bible Study Group",
      description: "Deepening understanding of Scripture through regular study and discussion.",
      icon: BookOpen,
      color: "from-purple-600 to-purple-700",
      activities: ["Weekly Studies", "Scripture Reflection", "Faith Sharing"]
    },
    {
      name: "Church Choir",
      description: "Leading worship through beautiful music and inspiring congregational singing.",
      icon: Music,
      color: "from-amber-600 to-amber-700",
      activities: ["Sunday Mass", "Special Events", "Music Ministry"]
    },
    {
      name: "Charity Committee",
      description: "Serving the needy and marginalized through various charitable activities.",
      icon: Hands,
      color: "from-red-600 to-red-700",
      activities: ["Food Distribution", "Medical Aid", "Education Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <HomeButton />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Holy Communities</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
              Our vibrant communities bring together people of all ages to grow in faith, serve others, and build lasting friendships in Christ.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, index) => {
              const IconComponent = community.icon;
              return (
                <motion.div
                  key={community.name}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-20 h-20 bg-gradient-to-br ${community.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:shadow-2xl`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-red-900 mb-4 font-serif text-center">{community.name}</h3>
                    <p className="text-gray-700 leading-relaxed font-serif text-center mb-6">{community.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-red-800 text-center mb-3 font-serif">Key Activities</h4>
                      {community.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="bg-amber-100 px-3 py-2 rounded-full text-center">
                          <span className="text-red-900 text-sm font-medium font-serif">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 bg-gradient-to-br from-red-800 to-red-900 rounded-3xl shadow-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-amber-100 mb-6 font-serif">Join a Community</h2>
            <p className="text-amber-200 text-lg font-serif mb-8 max-w-3xl mx-auto">
              Find your place in our church family. Each community offers unique opportunities for growth, 
              service, and fellowship. Join us and discover how you can make a difference.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-amber-100 p-6 rounded-2xl">
                <h3 className="text-red-900 font-bold mb-2 font-serif">Weekly Meetings</h3>
                <p className="text-red-800 text-sm font-serif">Regular gatherings for prayer and fellowship</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-2xl">
                <h3 className="text-red-900 font-bold mb-2 font-serif">Service Projects</h3>
                <p className="text-red-800 text-sm font-serif">Opportunities to serve our community</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-2xl">
                <h3 className="text-red-900 font-bold mb-2 font-serif">Spiritual Growth</h3>
                <p className="text-red-800 text-sm font-serif">Deepen your relationship with God</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default HolyCommunities;