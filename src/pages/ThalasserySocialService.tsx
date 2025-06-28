import React from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Heart, Users, Gift } from 'lucide-react';

const ThalasserySocialService: React.FC = () => {
  const charityPhotos = [
    "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/6647003/pexels-photo-6647003.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/6647000/pexels-photo-6647000.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    "https://images.pexels.com/photos/6646866/pexels-photo-6646866.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
  ];

  const services = [
    { title: "Food Distribution", icon: Gift, description: "Providing meals and food packages to families in need" },
    { title: "Medical Aid", icon: Heart, description: "Supporting healthcare needs and medical assistance for the underprivileged" },
    { title: "Education Support", icon: Users, description: "Helping children access education through scholarships and supplies" },
    { title: "Community Outreach", icon: HandHeart, description: "Reaching out to marginalized communities with love and support" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6 font-serif">Thalassery Social Service Society</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            Serving the needy and marginalized through various charitable activities and community outreach programs.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-green-900 mb-12 font-serif">Our Charity Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {charityPhotos.map((photo, index) => (
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
                  alt={`Charity Work ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-green-900 mb-12 font-serif">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border-4 border-green-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 font-serif">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 font-serif">{service.description}</p>
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
          className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl shadow-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6 font-serif">Charity Videos & Impact Stories</h2>
          <p className="text-green-100 text-lg font-serif mb-8">
            Watch the impact of our charitable work and hear stories from those whose lives have been touched by our service.
          </p>
          <div className="bg-white p-8 rounded-2xl">
            <p className="text-green-900 font-semibold font-serif">Video content showcasing our charity work and impact stories will be added here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThalasserySocialService;