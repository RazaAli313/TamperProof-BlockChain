import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiUpload, FiCheckCircle, FiLock } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: <FiShield className="h-8 w-8 text-blue-500" />,
    title: "Immutable Records",
    description: "All document hashes are stored permanently on the blockchain"
  },
  {
    icon: <FiUpload className="h-8 w-8 text-blue-500" />,
    title: "Easy Verification",
    description: "Verify documents instantly with QR codes or file uploads"
  },
  {
    icon: <FiCheckCircle className="h-8 w-8 text-blue-500" />,
    title: "Tamper-Proof",
    description: "Any alteration to documents is immediately detectable"
  },
  {
    icon: <FiLock className="h-8 w-8 text-blue-500" />,
    title: "Secure Sharing",
    description: "Share verified documents without exposing sensitive data"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Secure Document Verification <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                  Powered by Blockchain
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
              >
                TamperProof ensures your documents are authentic, verifiable, and protected from fraud using decentralized blockchain technology.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  to="/verify"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all flex items-center justify-center"
                >
                  Verify Documents
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all flex items-center justify-center"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose TamperProof?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our blockchain-based solution provides unmatched security and transparency
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Secure Your Documents?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join universities, corporations, and government agencies using TamperProof to eliminate document fraud.
            </p>
            <Link
              to="/register"
              className="inline-flex px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 rounded-lg text-lg font-medium transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}