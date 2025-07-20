import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, X, Play, Image as ImageIcon } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const Gallery: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  const galleryItems = [
    {
      id: 1,
      type: 'photo',
      src: '/images/IMG_20221218_123746 - Copy.jpg',
      title: 'Fr. Edwin Koyippuram - Our Beloved Vicar',
      category: 'Leadership'
    },
    {
      id: 2,
      type: 'photo',
      src: '/images/IMG_20230402_073518 copy.jpg',
      title: 'James Palakkunnel - Parish Coordinator',
      category: 'Leadership'
    },
    {
      id: 3,
      type: 'photo',
      src: '/images/IMG-20250629-WA0074.jpg',
      title: 'Akhil Jose - Parish Secretary',
      category: 'Leadership'
    },
    {
      id: 4,
      type: 'photo',
      src: '/images/IMG-20230806-WA0042.jpg',
      title: 'Beautiful Arabi Village',
      category: 'Community'
    },
    {
      id: 5,
      type: 'photo',
      src: '/images/IMG_6059 - Copy.jpeg',
      title: 'St. Joseph\'s UP School',
      category: 'Education'
    },
    {
      id: 6,
      type: 'photo',
      src: '/images/IMG-20240122-WA0141.jpg',
      title: 'Arabi Waterfalls - Natural Beauty',
      category: 'Nature'
    },
    {
      id: 7,
      type: 'photo',
      src: '/images/IMG-20230212-WA0005.jpg',
      title: 'Viju Orappankuzhymattathil - Kaikkaran',
      category: 'Management'
    },
    {
      id: 8,
      type: 'photo',
      src: 'public/images/IMG-20240120-WA0085.jpg',
      title: 'Baby Ezhuthupally - Kaikkaran',
      category: 'Management'
    },
    {
      id: 9,
      type: 'photo',
      src: '/images/IMG-20230212-WA0056.jpg',
      title: 'Shaju Nellikkal - Kaikkaran',
      category: 'Management'
    },
    {
      id: 10,
      type: 'photo',
      src: '/images/IMG-20230212-WA0011.jpg',
      title: 'Mathew Nadakkal - Kaikkaran',
      category: 'Management'
    },
    {
      id: 11,
      type: 'photo',
      src: '/images/IMG-20230514-WA0024.jpg',
      title: 'Shine Makkanal - Chief Internal Auditor',
      category: 'Management'
    },
    {
      id: 12,
      type: 'photo',
      src: '/images/IMG-20230618-WA0012.jpg',
      title: 'Sunny Nadakkal - Sunday School Headmaster',
      category: 'Education'
    },
    {
      id: 13,
      type: 'video',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/church.jpg',
      title: 'Christmas Celebration 2024',
      category: 'Events'
    },
    {
      id: 14,
      type: 'video',
      src: 'https://www.instagram.com/kcym_arabi_unit/reel/Cwjy3ENSk9o/',
      thumbnail: '/images/arabi.webp',
      title: 'Sunday Mass Highlights',
      category: 'Worship'
    },
    {
      id: 15,
      type: 'video',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/arabischool.webp',
      title: 'Youth Ministry Activities',
      category: 'Youth'
    },
    {
      id: 16,
      type: 'video',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/arwaterfallsc.jpg',
      title: 'Parish Retreat 2024',
      category: 'Events'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'photos') return item.type === 'photo';
    if (activeTab === 'videos') return item.type === 'video';
    return true;
  });

  const openModal = (item: any) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

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
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Church Gallery</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
              Explore our beautiful collection of memories, moments, and milestones from St. Joseph's Church community.
            </p>
            
            {/* Bible Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 mt-8 mb-8 max-w-3xl mx-auto border-2 border-amber-200"
            >
              <blockquote className="text-red-900 text-lg font-serif italic text-center mb-3">
                "Every good and perfect gift is from above, coming down from the Father of the heavenly lights."
              </blockquote>
              <p className="text-amber-600 text-sm font-serif text-center">- James 1:17</p>
            </motion.div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-2 shadow-xl border-2 border-amber-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-red-800 to-red-900 text-amber-100 shadow-lg'
                      : 'text-red-900 hover:bg-amber-100'
                  }`}
                >
                  All Media
                </button>
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 flex items-center ${
                    activeTab === 'photos'
                      ? 'bg-gradient-to-r from-red-800 to-red-900 text-amber-100 shadow-lg'
                      : 'text-red-900 hover:bg-amber-100'
                  }`}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Photos
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 flex items-center ${
                    activeTab === 'videos'
                      ? 'bg-gradient-to-r from-red-800 to-red-900 text-amber-100 shadow-lg'
                      : 'text-red-900 hover:bg-amber-100'
                  }`}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Videos
                </button>
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.type === 'video' ? item.thumbnail : item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Media Type Icon */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        item.type === 'video' 
                          ? 'bg-gradient-to-br from-red-600 to-red-700' 
                          : 'bg-gradient-to-br from-blue-600 to-blue-700'
                      }`}>
                        {item.type === 'video' ? (
                          <Play className="w-5 h-5 text-white" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold font-serif text-sm leading-tight">{item.title}</h3>
                      <p className="text-amber-200 text-xs font-serif mt-1">{item.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {selectedMedia && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {selectedMedia.type === 'video' ? (
                    <div className="aspect-video">
                      <iframe
                        src={selectedMedia.src}
                        title={selectedMedia.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img
                      src={selectedMedia.src}
                      alt={selectedMedia.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  )}

                  <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50">
                    <h3 className="text-2xl font-bold text-red-900 mb-2 font-serif">{selectedMedia.title}</h3>
                    <p className="text-amber-600 font-serif">{selectedMedia.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
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

export default Gallery;