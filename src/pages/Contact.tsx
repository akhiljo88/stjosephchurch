import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["Office: 8129201658", "Emergency: 9400062714"],
      action: () => window.open('tel:8129201658'),
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["akhiljose060@gmail.com", "parish@stjosepharabi.org"],
      action: () => window.open('mailto:akhiljose060@gmail.com'),
      color: "from-red-600 to-red-700"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["St. Joseph's Church", "Arabi, Kerala", "India"],
      action: () => window.open('https://maps.google.com/?q=St+Josephs+Church+Arabi'),
      color: "from-green-600 to-green-700"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sunday: 8:00 AM - 12:00 PM"],
      action: () => {},
      color: "from-purple-600 to-purple-700"
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
          <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Connect With Us</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
            We're here to serve you and our community. Reach out to us for any questions, 
            prayer requests, or to learn more about our church family.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                onClick={info.action}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-20 h-20 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:shadow-2xl`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-red-900 mb-4 font-serif text-center">{info.title}</h3>
                
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="bg-amber-100 px-3 py-2 rounded-lg text-center">
                      <span className="text-red-900 text-sm font-medium font-serif">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-12 border-4 border-amber-200"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-amber-100" />
            </div>
            <h2 className="text-3xl font-bold text-red-900 mb-4 font-serif">Send Us a Message</h2>
            <p className="text-gray-700 font-serif">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <form className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-red-900 font-semibold mb-2 font-serif">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-red-900 font-semibold mb-2 font-serif">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-red-900 font-semibold mb-2 font-serif">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-red-900 font-semibold mb-2 font-serif">Subject</label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="prayer">Prayer Request</option>
                  <option value="wedding">Wedding Planning</option>
                  <option value="baptism">Baptism</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-red-900 font-semibold mb-2 font-serif">Message</label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif resize-none"
                placeholder="Please share your message, prayer request, or any questions you may have..."
              ></textarea>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
              >
                <Send className="w-6 h-6 mr-3" />
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Quick Contact Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-red-900 mb-8 font-serif">Quick Contact</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/9400062714?text=Hello%20St.%20Joseph%27s%20Church%20Arabi', '_blank')}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp Us
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('tel:8129201658')}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('mailto:akhiljose060@gmail.com')}
              className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300 font-serif"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;