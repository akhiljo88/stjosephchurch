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
import UserDashboard from './pages/UserDashboard';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';
import ArabiHistory from './pages/ArabiHistory';
import Gallery from './pages/Gallery';
import Directory from './pages/Directory';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import AddMedia from './pages/AddMedia';
import AddFamily from './pages/AddFamily';
import FamiliesDirectory from './pages/FamiliesDirectory';
import EditFamily from './pages/EditFamily';
import EditMedia from './pages/EditMedia';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="/arabi-history" element={<ArabiHistory />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/add-media" element={<AddMedia />} />
          <Route path="/add-family" element={<AddFamily />} />
          <Route path="/families-directory" element={<FamiliesDirectory />} />
          <Route path="/edit-family/:id" element={<EditFamily />} />
          <Route path="/edit-media/:id" element={<EditMedia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;