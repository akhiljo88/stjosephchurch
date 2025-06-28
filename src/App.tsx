import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import OurHistory from './pages/OurHistory';
import Administration from './pages/Administration';
import AdminPanel from './pages/AdminPanel';
import Services from './pages/Services';
import HolyCommunities from './pages/HolyCommunities';
import Families from './pages/Families';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Login from './pages/Login';
import UserPanel from './pages/UserPanel';
import AdminDashboard from './pages/AdminDashboard';
import SpecialEvents from './pages/SpecialEvents';
import KcymArabiUnit from './pages/KcymArabiUnit';
import CherupushpaMissionLeague from './pages/CherupushpaMissionLeague';
import ThalasserySocialService from './pages/ThalasserySocialService';
import Mathruvedi from './pages/Mathruvedi';
import StSebastiansUnit from './pages/StSebastiansUnit';
import StAnnesUnit from './pages/StAnnesUnit';
import StMariaGorethyUnit from './pages/StMariaGorethyUnit';
import StAntonysUnit from './pages/StAntonysUnit';
import StThomasUnit from './pages/StThomasUnit';
import StAlphonsaUnit from './pages/StAlphonsaUnit';
import StMarysUnit from './pages/StMarysUnit';
import StDominicSavioUnit from './pages/StDominicSavioUnit';
import StJohnCalabriaUnit from './pages/StJohnCalabriaUnit';
import StJosephsUnit from './pages/StJosephsUnit';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <Header onMenuClick={() => setIsNavOpen(true)} />
        <AnimatePresence>
          {isNavOpen && (
            <Navigation onClose={() => setIsNavOpen(false)} />
          )}
        </AnimatePresence>
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-history" element={<OurHistory />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/services" element={<Services />} />
            <Route path="/holy-communities" element={<HolyCommunities />} />
            <Route path="/families" element={<Families />} />
            <Route path="/events" element={<Events />} />
            <Route path="/special-events" element={<SpecialEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-panel" element={<UserPanel />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/kcym-arabi-unit" element={<KcymArabiUnit />} />
            <Route path="/cherupushpa-mission-league" element={<CherupushpaMissionLeague />} />
            <Route path="/thalassery-social-service" element={<ThalasserySocialService />} />
            <Route path="/mathruvedi" element={<Mathruvedi />} />
            <Route path="/st-sebastians-unit" element={<StSebastiansUnit />} />
            <Route path="/st-annes-unit" element={<StAnnesUnit />} />
            <Route path="/st-maria-gorethy-unit" element={<StMariaGorethyUnit />} />
            <Route path="/st-antonys-unit" element={<StAntonysUnit />} />
            <Route path="/st-thomas-unit" element={<StThomasUnit />} />
            <Route path="/st-alphonsa-unit" element={<StAlphonsaUnit />} />
            <Route path="/st-marys-unit" element={<StMarysUnit />} />
            <Route path="/st-dominic-savio-unit" element={<StDominicSavioUnit />} />
            <Route path="/st-john-calabria-unit" element={<StJohnCalabriaUnit />} />
            <Route path="/st-josephs-unit" element={<StJosephsUnit />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;