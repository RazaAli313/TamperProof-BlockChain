import { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadFull } from "tsparticles";
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Login({ updateAuth }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      updateAuth(res.data.token, res.data.role);
      navigate(res.data.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials and try again.');
      console.error('Login error:', err.response);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#3B82F6" },
      shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3B82F6",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden relative">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles init={particlesInit} options={particlesConfig} />
      </div>

      {/* Glowing Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-20 filter blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-600 opacity-15 filter blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white border-opacity-20 z-10 w-full max-w-md"
      >
        <div className="p-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Tamper Proof</h1>
            <p className="text-blue-200">Blockchain Document Verification</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/20 text-red-200 rounded-lg text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-1">Login As</label>
                <div className="flex rounded-lg bg-white bg-opacity-10 p-1">
                  {['user', 'admin'].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => handleRoleChange(r)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        formData.role === r 
                          ? 'bg-blue-600 text-white shadow' 
                          : 'text-blue-200 hover:text-white'
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-1">Email</label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-1">Password</label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </motion.div>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-blue-200 text-sm">
              Powered by <span className="font-semibold text-white">Syed Muhammad Raza Ali</span>
            </p>
            <p className="text-blue-300 text-xs mt-1">Secure blockchain document verification system</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Nodes */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-blue-400 rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />
        ))}
      </div>
    </div>
  );
}