import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn, Home, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication
    if (formData.username === 'admin' && formData.password === 'admin123') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-panel');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignOut = () => {
    setFormData({ username: '', password: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center shadow-xl mx-auto mb-6 overflow-hidden"
            >
              <img 
                src="/src/assets/st-joseph.png" 
                alt="St. Joseph" 
                className="w-16 h-16 object-cover rounded-full"
              />
            </motion.div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2 font-serif">
              Church Login
            </h1>
            <p className="text-gray-700 font-serif">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-blue-900 font-semibold mb-2 font-serif">
                Enter Your Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-amber-200 focus:border-blue-500 focus:outline-none transition-colors duration-300 font-serif"
                  placeholder="Enter your username"
                  required
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-blue-900 font-semibold mb-2 font-serif">
                Enter Your Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 border-amber-200 focus:border-blue-500 focus:outline-none transition-colors duration-300 font-serif"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-blue-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-amber-100 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
              >
                <LogIn className="w-6 h-6 mr-3" />
                Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
              >
                Sign Out
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
              >
                <Home className="w-6 h-6 mr-3" />
                Home
              </motion.button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-amber-100 rounded-xl border border-amber-300">
            <p className="text-sm text-blue-800 font-serif text-center">
              <strong>Demo Credentials:</strong><br />
              Admin: admin / admin123<br />
              User: Any other username/password
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;