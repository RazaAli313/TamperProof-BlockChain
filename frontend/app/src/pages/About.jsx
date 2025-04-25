import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiGlobe, FiCode } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: <FiShield className="h-8 w-8 text-blue-500" />,
    title: "Blockchain Security",
    description: "Every document hash is immutably stored on the Polygon blockchain"
  },
  {
    icon: <FiUsers className="h-8 w-8 text-blue-500" />,
    title: "Trusted by Institutions",
    description: "Used by universities, corporations, and government agencies"
  },
  {
    icon: <FiGlobe className="h-8 w-8 text-blue-500" />,
    title: "Global Verification",
    description: "Verify documents from anywhere in the world instantly"
  },
  {
    icon: <FiCode className="h-8 w-8 text-blue-500" />,
    title: "Open Standards",
    description: "Built with W3C verifiable credentials compatibility"
  }
];

const team = [
  {
    name: "Syed Muhammad Raza Ali",
    role: "Founder & Lead Developer",
    bio: "Blockchain expert with 5+ years in decentralized systems"
  },
  {
    name: "Sarah Johnson",
    role: "Security Architect",
    bio: "Specializes in cryptographic document verification"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    bio: "Focuses on user experience for enterprise adoption"
  }
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                About TamperProof
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Revolutionizing document verification through blockchain technology
            </motion.p>
          </div>

          {/* Mission Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-20 border border-gray-700/50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-8">
                At TamperProof, we're eliminating document fraud by creating an immutable 
                record of authenticity on the blockchain. Our platform provides instant 
                verification for academic credentials, professional certificates, and legal 
                documents.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-700/30 p-6 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center"
                >
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Blockchain Tech Section */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 md:p-12 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Blockchain Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-300 mb-6">
                  TamperProof leverages Polygon's Ethereum-compatible blockchain to provide:
                </p>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="ml-3">Low-cost transactions (fractions of a cent per verification)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="ml-3">2-3 second confirmation times</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="ml-3">Carbon-neutral network operations</p>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-gray-400 text-center">[Blockchain Visualization]</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}