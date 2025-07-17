import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Church, Star, Home as HomeIcon } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const ArabiHistory: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const historicalMilestones = [
    {
      year: "Ancient Times",
      title: "Early Settlements",
      description: "Arabi has been inhabited for centuries, with early settlements dating back to ancient times when it was part of the traditional spice trade routes.",
      icon: MapPin
    },
    {
      year: "Medieval Period",
      title: "Cultural Development",
      description: "During the medieval period, Arabi developed as a center of learning and culture, with traditional arts and crafts flourishing in the region.",
      icon: Star
    },
    {
      year: "Colonial Era",
      title: "British Influence",
      description: "Under British colonial rule, Arabi saw significant changes in administration and infrastructure, while maintaining its cultural identity.",
      icon: Users
    },
    {
      year: "1892",
      title: "St. Joseph's Church Founded",
      description: "The establishment of St. Joseph's Church marked a significant milestone in the spiritual and community life of Arabi.",
      icon: Church
    },
    {
      year: "Post-Independence",
      title: "Modern Development",
      description: "After India's independence, Arabi has grown into a vibrant community while preserving its rich heritage and traditions.",
      icon: HomeIcon
    }
  ];

  const culturalAspects = [
    {
      title: "Traditional Festivals",
      description: "Arabi celebrates various traditional festivals throughout the year, bringing the community together in joy and devotion.",
      icon: Star
    },
    {
      title: "Local Cuisine",
      description: "The region is known for its distinctive Kerala cuisine, featuring coconut-based curries, seafood, and traditional spices.",
      icon: HomeIcon
    },
    {
      title: "Arts & Crafts",
      description: "Traditional handicrafts and art forms have been passed down through generations, keeping the cultural heritage alive.",
      icon: Users
    },
    {
      title: "Religious Harmony",
      description: "Arabi is known for its religious tolerance and harmony, with people of different faiths living together peacefully.",
      icon: Church
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
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">ARABI</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
              Discover the rich history and cultural heritage of Arabi, a place where tradition meets modernity, 
              and where our community has thrived for generations.
            </p>
            
            {/* Bible Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 mt-8 mb-8 max-w-3xl mx-auto border-2 border-amber-200"
            >
              <blockquote className="text-red-900 text-lg font-serif italic text-center mb-3">
                "The Lord your God will bless you in the land he is giving you."
              </blockquote>
              <p className="text-amber-600 text-sm font-serif text-center">- Deuteronomy 15:4</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            {/* Photo Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Glimpses of Arabi</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/images/arabi.webp"
                      alt="Arabi Waterfalls"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg font-serif">Arabi</h3>
                      <p className="text-amber-200 text-sm font-serif">Beauty of our village</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/images/arabischool.webp"
                      alt="St.Jospehs UP School"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg font-serif">St.Josephs UP School </h3>
                      <p className="text-amber-200 text-sm font-serif">Guiding the generations with knowledge and leadership</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/images/james.jpg"
                      alt="Parish Coordinator"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg font-serif">Nisha Teacher</h3>
                      <p className="text-amber-200 text-sm font-serif">Ward Member-Organizing community activities</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Historical Timeline</h2>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-1/4 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-800 via-amber-400 to-red-800"></div>
              
              {historicalMilestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                    className="relative flex items-center mb-16 flex-row"
                  >
                    {/* Content positioned to the right of timeline */}
                    <div className="w-3/4 pl-12 text-left">
                      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-xl border-2 border-amber-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mr-4">
                            <IconComponent className="w-6 h-6 text-amber-100" />
                          </div>
                          <h3 className="text-2xl font-bold text-red-900 font-serif">{milestone.year}</h3>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 font-serif">{milestone.title}</h4>
                        <p className="text-gray-700 leading-relaxed font-serif">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot positioned at 1/4 from left */}
                    <div className="absolute left-1/4 transform -translate-x-1/2 w-6 h-6 bg-amber-400 rounded-full border-4 border-red-800 shadow-lg"></div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-red-900 mb-12 font-serif">Cultural Heritage</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {culturalAspects.map((aspect, index) => {
                const IconComponent = aspect.icon;
                return (
                  <motion.div
                    key={aspect.title}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.15, duration: 0.8 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-red-900 font-serif">{aspect.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-serif">{aspect.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-12 border-4 border-amber-200"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl">
                <MapPin className="w-10 h-10 text-amber-100" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-red-900 mb-8 font-serif">Arabi Today</h2>
            
            <div className="prose prose-lg prose-amber max-w-none">
              <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif text-center">
                Arabi is an ancient village in the eastern hilly region, part of the Iritty Taluk, located 40 km east of the district headquarters Kannur, and is the seventh ward of the Ulikkal Panchayat. The area is crossed by the Kerala State Hill Highway SH-59 and shares its eastern border with the Kodagu district of Karnataka. Surrounded by the major cities of Peravoor and Koothuparamba to the south and Taliparamba to the west, Arabi is located five kilometres east of the 800-year-old Sreevayathur Kaliyar Shiva Temple.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6 text-lg font-serif text-center">
               This village, just like its name, has a lot of diversity. A hilly village that grew up as part of the Malabar migration. Situated in the foothills of the eastern and western mountain ranges, this land is rich in geography and climate. The Valapattanam River, adjacent to the Brahmagiri Hills, and the natural beauty of Arabi attract tourists here. An agricultural community, this place is rich in cash crops such as rubber, cashew, coconut, and adakka. 
              </p>

              <p className="text-gray-700 leading-relaxed text-lg font-serif text-center">
                The first school in Arabi was established in 1970 as a result of the collective efforts of a people. Half a century later, this school still plays a major role in the socio-cultural growth of Arabi. As we walk the historical path of today's Arabi, who are advancing on the path of development, we are amazed by the history of a people who conquered mountains and hills through hard work and unity.
              </p>
              <br>
                <h4 className="text-3xl font-bold text-center text-red-900 mb-8 font-serif">Amal Jolly</h4>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Big Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="mt-16"
      >
        <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl mx-6 shadow-2xl">
          <img 
            src="/images/arwaterfallsc.jpg"
            alt="Arabi Waterfalls - A Mark of Beauty"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
                ARABI WATERFALLS
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-amber-200 font-serif max-w-4xl mx-auto leading-relaxed">
                
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1 bg-amber-400 rounded-full"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-4 border-amber-400 rounded-full opacity-30"></div>
          <div className="absolute top-12 right-12 w-8 h-8 border-2 border-white rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-12 w-12 h-12 border-3 border-amber-300 rounded-full opacity-25"></div>
        </div>
      </motion.div>
      <Copyright />
    </div>
  );
};

export default ArabiHistory;