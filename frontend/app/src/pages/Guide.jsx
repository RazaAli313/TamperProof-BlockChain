import { FiShield, FiUpload, FiCheckCircle, FiCode, FiDatabase } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = [
  {
    icon: <FiUpload className="h-6 w-6 text-blue-500" />,
    title: "Upload Documents",
    description: "Securely upload your PDFs, certificates, or credentials through the admin dashboard"
  },
  {
    icon: <FiCode className="h-6 w-6 text-blue-500" />,
    title: "Blockchain Hashing",
    description: "Each document gets a unique SHA-256 hash stored permanently on the Polygon blockchain"
  },
  {
    icon: <FiCheckCircle className="h-6 w-6 text-blue-500" />,
    title: "Verification",
    description: "Anyone can verify documents by comparing hashes or scanning QR codes"
  },
  {
    icon: <FiDatabase className="h-6 w-6 text-blue-500" />,
    title: "Immutable Records",
    description: "All transactions are permanently recorded and cannot be altered"
  }
];

export default function Guide() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                TamperProof Guide
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn how to securely verify documents using blockchain technology
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Instructions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step Process</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">For Admins</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Login to your admin dashboard</li>
                    <li>Click "Upload Document" and select files</li>
                    <li>System automatically generates blockchain hash</li>
                    <li>Share the verification link/QR with recipients</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">For Verifiers</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Scan the document's QR code or visit verification URL</li>
                    <li>Upload the document you received</li>
                    <li>System compares hashes in real-time</li>
                    <li>Get instant confirmation of authenticity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}