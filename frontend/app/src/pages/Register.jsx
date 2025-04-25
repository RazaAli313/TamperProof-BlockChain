import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

// 3D Blockchain Background Component
const BlockchainBackground = () => (
  <Canvas className="absolute inset-0 z-0 opacity-40">
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
    {[...Array(15)].map((_, i) => (
      <mesh
        key={i}
        position={[
          Math.sin(i) * 15,
          Math.cos(i) * 15,
          -i * 2
        ]}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" />
      </mesh>
    ))}
  </Canvas>
);

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // default role
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.password) newErrors.password = 'Password required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/login');
    } catch (err) {
      setErrors({ server: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      <BlockchainBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
          <div className="p-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiUser className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-blue-200">Join our blockchain network</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.server && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/20 text-red-200 rounded-lg text-sm"
                >
                  {errors.server}
                </motion.div>
              )}

               {/* Role Selection - Matching Login Style */}
               <div>
                <label className="block text-sm text-gray-300 mb-2">Register As</label>
                <div className="flex rounded-lg bg-gray-700/50 p-1 border border-gray-600/30">
                  {['user', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData({...formData, role: r})}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        formData.role === r 
                          ? 'bg-blue-600 text-white shadow' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </motion.div>
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="your@email.com"
                  />
                </motion.div>
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Password</label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="••••••••"
                  />
                </motion.div>
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="••••••••"
                  />
                </motion.div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

             

              {/* Terms */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    required
                  />
                </div>
                <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                  I agree to the <a href="#" className="text-blue-400 hover:underline">terms</a>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
                  loading ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Register Now <FiArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:underline font-medium">
                Sign in
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center text-xs text-gray-500">
              <p>Powered by <span className="text-blue-400">Syed Muhammad Raza Ali</span></p>
              <p className="mt-1">Blockchain Document Verification System</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}