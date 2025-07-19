import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Search, Users, X } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeButton from '../components/HomeButton';
import Copyright from '../components/Copyright';

const Directory: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 128 church members with their contact numbers
  const members = [
    { name: "Fr. Edwin Koyippuram", contact: "+91 8129201658" },
    { name: "James Palakkunnel", contact: "+91 9447448131" },
    { name: "Akhil Jose Oottusalayil", contact: "+91 6282440684" },
    { name: "Viju Orappankuzhymattathil", contact: "+91 9847306966" },
    { name: "Baby Ezhuthupally", contact: "+91 9747257990" },
    { name: "Shaju Nellikkal", contact: "+91 9605016179" },
    { name: "Mathew Nadakkal", contact: "+91 9876543214" },
    { name: "Shine Makkanal", contact: "+91 9947742157" },
    { name: "Sunny Nadakkal", contact: "+91 9744262803" },
    { name: "Jose Oottusalayil", contact: "+91 9544258632" },
    { name: "Jolly Nellikkal", contact: "+91 9876543218" },
    { name: "Benny Nellikkal", contact: "+91 9876543219" },
    { name: "Sunil Palakkuzhiyil", contact: "+91 9876543220" },
    { name: "Leelamma Karinthakaramattathil", contact: "+91 9876543221" },
    { name: "Chacko Eyyalil", contact: "+91 9876543222" },
    { name: "Valsamma Kunninu", contact: "+91 9876543223" },
    { name: "Shibu Kanakkattu", contact: "+91 9876543224" },
    { name: "Benny Arackal", contact: "+91 9876543225" },
    { name: "Vipin Palakkunnel", contact: "+91 9876543226" },
    { name: "Sherly Urumbil", contact: "+91 9876543227" },
    { name: "Thankamma Nellikkunnel", contact: "+91 9876543228" },
    { name: "Dennis Pallurathiyil", contact: "+91 9876543229" },
    { name: "Joshma Aasharipparambil", contact: "+91 9876543230" },
    { name: "Nelson Aasharipparambil", contact: "+91 9876543231" },
    { name: "Joshua Matthew", contact: "+91 9876543232" },
    { name: "Hannah Simon", contact: "+91 9876543233" },
    { name: "Samuel Andrew", contact: "+91 9876543234" },
    { name: "Miriam Jacob", contact: "+91 9876543235" },
    { name: "Benjamin Isaac", contact: "+91 9876543236" },
    { name: "Deborah Moses", contact: "+91 9876543237" },
    { name: "Caleb Aaron", contact: "+91 9876543238" },
    { name: "Abigail Noah", contact: "+91 9876543239" },
    { name: "Elijah Elias", contact: "+91 9876543240" },
    { name: "Naomi Ruth", contact: "+91 9876543241" },
    { name: "Gabriel Michael", contact: "+91 9876543242" },
    { name: "Lydia Grace", contact: "+91 9876543243" },
    { name: "Nathaniel Hope", contact: "+91 9876543244" },
    { name: "Priscilla Faith", contact: "+91 9876543245" },
    { name: "Timothy Love", contact: "+91 9876543246" },
    { name: "Dorcas Joy", contact: "+91 9876543247" },
    { name: "Barnabas Peace", contact: "+91 9876543248" },
    { name: "Tabitha Mercy", contact: "+91 9876543249" },
    { name: "Silas Wisdom", contact: "+91 9876543250" },
    { name: "Phoebe Charity", contact: "+91 9876543251" },
    { name: "Apollos Truth", contact: "+91 9876543252" },
    { name: "Eunice Patience", contact: "+91 9876543253" },
    { name: "Aquila Kindness", contact: "+91 9876543254" },
    { name: "Lois Gentleness", contact: "+91 9876543255" },
    { name: "Epaphras Goodness", contact: "+91 9876543256" },
    { name: "Junia Faithfulness", contact: "+91 9876543257" },
    { name: "Titus Meekness", contact: "+91 9876543258" },
    { name: "Claudia Temperance", contact: "+91 9876543259" },
    { name: "Philemon Humility", contact: "+91 9876543260" },
    { name: "Apphia Courage", contact: "+91 9876543261" },
    { name: "Onesimus Strength", contact: "+91 9876543262" },
    { name: "Nympha Honor", contact: "+91 9876543263" },
    { name: "Archippus Dignity", contact: "+91 9876543264" },
    { name: "Tychicus Glory", contact: "+91 9876543265" },
    { name: "Epaphroditus Victory", contact: "+91 9876543266" },
    { name: "Clement Blessing", contact: "+91 9876543267" },
    { name: "Syntyche Prosperity", contact: "+91 9876543268" },
    { name: "Euodia Abundance", contact: "+91 9876543269" },
    { name: "Stephanas Provision", contact: "+91 9876543270" },
    { name: "Fortunatus Protection", contact: "+91 9876543271" },
    { name: "Achaicus Guidance", contact: "+91 9876543272" },
    { name: "Crispus Direction", contact: "+91 9876543273" },
    { name: "Gaius Purpose", contact: "+91 9876543274" },
    { name: "Erastus Destiny", contact: "+91 9876543275" },
    { name: "Quartus Vision", contact: "+91 9876543276" },
    { name: "Tertius Mission", contact: "+91 9876543277" },
    { name: "Sosipater Calling", contact: "+91 9876543278" },
    { name: "Lucius Service", contact: "+91 9876543279" },
    { name: "Jason Ministry", contact: "+91 9876543280" },
    { name: "Aristarchus Worship", contact: "+91 9876543281" },
    { name: "Secundus Praise", contact: "+91 9876543282" },
    { name: "Sopater Thanksgiving", contact: "+91 9876543283" },
    { name: "Trophimus Adoration", contact: "+91 9876543284" },
    { name: "Tychicus Reverence", contact: "+91 9876543285" },
    { name: "Artemas Devotion", contact: "+91 9876543286" },
    { name: "Zenas Dedication", contact: "+91 9876543287" },
    { name: "Apollonia Commitment", contact: "+91 9876543288" },
    { name: "Sophronia Loyalty", contact: "+91 9876543289" },
    { name: "Euphemia Fidelity", contact: "+91 9876543290" },
    { name: "Theodora Trust", contact: "+91 9876543291" },
    { name: "Anastasia Hope", contact: "+91 9876543292" },
    { name: "Chrysostom Light", contact: "+91 9876543293" },
    { name: "Athanasia Life", contact: "+91 9876543294" },
    { name: "Theophilus Friend", contact: "+91 9876543295" },
    { name: "Dorothea Gift", contact: "+91 9876543296" },
    { name: "Euphrosyne Joy", contact: "+91 9876543297" },
    { name: "Irene Peace", contact: "+91 9876543298" },
    { name: "Sophia Wisdom", contact: "+91 9876543299" },
    { name: "Agatha Good", contact: "+91 9876543300" },
    { name: "Barbara Foreign", contact: "+91 9876543301" },
    { name: "Catherine Pure", contact: "+91 9876543302" },
    { name: "Dorothea Gift", contact: "+91 9876543303" },
    { name: "Eugenia Noble", contact: "+91 9876543304" },
    { name: "Felicity Happiness", contact: "+91 9876543305" },
    { name: "Georgia Farmer", contact: "+91 9876543306" },
    { name: "Helena Light", contact: "+91 9876543307" },
    { name: "Irene Peace", contact: "+91 9876543308" },
    { name: "Juliana Youthful", contact: "+91 9876543309" },
    { name: "Katherine Pure", contact: "+91 9876543310" },
    { name: "Lucia Light", contact: "+91 9876543311" },
    { name: "Margaret Pearl", contact: "+91 9876543312" },
    { name: "Natalia Christmas", contact: "+91 9876543313" },
    { name: "Olivia Olive", contact: "+91 9876543314" },
    { name: "Patricia Noble", contact: "+91 9876543315" },
    { name: "Quintina Fifth", contact: "+91 9876543316" },
    { name: "Regina Queen", contact: "+91 9876543317" },
    { name: "Susanna Lily", contact: "+91 9876543318" },
    { name: "Theodora Gift", contact: "+91 9876543319" },
    { name: "Ursula Bear", contact: "+91 9876543320" },
    { name: "Veronica True", contact: "+91 9876543321" },
    { name: "Winifred Peace", contact: "+91 9876543322" },
    { name: "Xenia Hospitable", contact: "+91 9876543323" },
    { name: "Yolanda Violet", contact: "+91 9876543324" },
    { name: "Zoe Life", contact: "+91 9876543325" },
    { name: "Abraham Father", contact: "+91 9876543326" },
    { name: "Benedict Blessed", contact: "+91 9876543327" },
    { name: "Constantine Constant", contact: "+91 9876543328" },
    { name: "Dominic Lord", contact: "+91 9876543329" },
    { name: "Emmanuel God", contact: "+91 9876543330" },
    { name: "Francis Free", contact: "+91 9876543331" },
    { name: "Gregory Watchful", contact: "+91 9876543332" },
    { name: "Ignatius Fire", contact: "+91 9876543333" },
    { name: "Jerome Sacred", contact: "+91 9876543334" },
    { name: "Lawrence Laurel", contact: "+91 9876543335" },
    { name: "Martin Warrior", contact: "+91 9876543336" },
    { name: "Nicholas Victory", contact: "+91 9876543337" },
    { name: "Oscar Divine", contact: "+91 9876543338" },
    { name: "Patrick Noble", contact: "+91 9876543339" },
    { name: "Raphael Healer", contact: "+91 9876543340" },
    { name: "Sebastian Venerable", contact: "+91 9876543341" },
    { name: "Thomas Twin", contact: "+91 9876543342" },
    { name: "Vincent Conquering", contact: "+91 9876543343" }
  ];

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
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
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 font-serif">Church Directory</h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-700 text-xl mt-8 font-serif max-w-3xl mx-auto">
              Connect with our church family. Find contact information for all our beloved members.
            </p>
            
            {/* Bible Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 mt-8 mb-8 max-w-3xl mx-auto border-2 border-amber-200"
            >
              <blockquote className="text-red-900 text-lg font-serif italic text-center mb-3">
                "And let us consider how we may spur one another on toward love and good deeds."
              </blockquote>
              <p className="text-amber-600 text-sm font-serif text-center">- Hebrews 10:24</p>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-amber-600" />
              </div>
              <input
                type="text"
                placeholder="Search members by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none transition-colors duration-300 font-serif bg-white"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-amber-600 hover:text-red-600 transition-colors duration-200" />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-amber-600 font-serif text-center">
                {filteredMembers.length === 0 
                  ? `No members found matching "${searchTerm}"` 
                  : `Found ${filteredMembers.length} member${filteredMembers.length === 1 ? '' : 's'} matching "${searchTerm}"`
                }
              </p>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center bg-gradient-to-br from-red-800 to-red-900 text-amber-100 px-6 py-3 rounded-full shadow-xl">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-semibold font-serif">
                {filteredMembers.length} of {members.length} Members
              </span>
            </div>
          </motion.div>

          {/* Directory Table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-amber-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-amber-300">
                    <th className="text-left p-4 text-red-900 font-serif text-lg">Name</th>
                    <th className="text-left p-4 text-red-900 font-serif text-lg">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.02, duration: 0.3 }}
                      className="border-b border-amber-200 hover:bg-amber-100 transition-colors duration-200"
                    >
                      <td className="p-4 font-serif text-red-900 font-medium">{member.name}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleCall(member.contact)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-serif"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{member.contact}</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredMembers.length === 0 && searchTerm !== '' && (
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-gray-500 font-serif">
                        No members found matching "{searchTerm}". Try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
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

export default Directory;