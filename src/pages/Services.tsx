import React from 'react';
import { motion } from 'framer-motion';
import { Church, Heart, Users, BookOpen, Calendar, Star } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Holy Mass",
      description: "Daily Mass at 6:30 AM and Sunday Mass at 7:00 AM, 9:00 AM, and 6:00 PM",
      icon: Church,
      color: "from-red-600 to-red-700"
    },
    {
      title: "Sacraments",
      description: "Baptism, Confirmation, Holy Communion, Marriage, and Last Rites",
      icon: Star,
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "Prayer Groups",
      description: "Weekly prayer meetings for spiritual growth and community bonding",
      icon: Users,
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Bible Study",
      description: "Regular Bible study sessions for deeper understanding of Scripture",
      icon: BookOpen,
      color: "from-green-600 to-green-700"
    },
    {
      title: "Youth Ministry",
      description: "Programs and activities designed for young parishioners",
      icon: Heart,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Special Events",
      description: "Religious festivals, retreats, and community celebrations",
      icon: Calendar,
      color: "from-pink-600 to-pink-700"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Our Services</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            We offer a variety of spiritual services and programs to nurture your faith journey and strengthen our community bonds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:shadow-2xl`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-red-900 mb-4 font-serif text-center">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-serif text-center">{service.description}</p>
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
          <h2 className="text-3xl font-bold text-amber-100 mb-6 font-serif">Join Our Community</h2>
          <p className="text-amber-200 text-lg font-serif mb-8 max-w-3xl mx-auto">
            All are welcome to participate in our services and become part of our loving church family. 
            Come as you are and experience the warmth of our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-amber-100 px-6 py-3 rounded-full">
              <span className="text-red-900 font-semibold font-serif">All Ages Welcome</span>
            </div>
            <div className="bg-amber-100 px-6 py-3 rounded-full">
              <span className="text-red-900 font-semibold font-serif">Family Friendly</span>
            </div>
            <div className="bg-amber-100 px-6 py-3 rounded-full">
              <span className="text-red-900 font-semibold font-serif">Community Focused</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;