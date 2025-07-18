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
      year: "Golden 60's",
      title: "Modern Development",
      description: "After India's independence, Arabi has grown into a vibrant community while preserving its rich heritage and traditions.",
      icon: Church
    },
    {
      year: "1970",
      title: "St.Joseph UP School Established",
      description: "After the invasion of Migrant Christians with the support of Diocese, Local administration and the people the temple of knowledge was established.",
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
      description: "The region is known for its distinctive Kerala cuisine, featuring coconut-based curries, riverfish, and traditional spices.",
      icon: HomeIcon
    },
    {
      title: "Waterfall & Hills",
      description: "A vibrant waterfall which drews the natural beauty of Arabi attracts tourists from different parts of the district.Moreover Arabi is known for its Hill topography and Greenary.",
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
            
              <h4 className="text-3xl font-bold text-center text-red-900 mb-5 font-serif">by Amal Jolly
              </h4>
            
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
      <div className="bg-gradient-to-r from-red-900 to-red-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6">
            <motion.button
              onClick={() => window.open('https://www.instagram.com/kcym_arabi_unit/', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={() => window.open('https://wa.me/+919400062714?text=Hello%20St.%20Joseph%27s%20Church%20Arabi', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={() => window.open('mailto:akhiljose060@gmail.com', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </motion.button>
            
            <motion.button
              onClick={() => window.open('tel:8129201658', '_blank')}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabiHistory;