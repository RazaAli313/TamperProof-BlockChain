import { Link } from 'react-router-dom';
import { FiShield,FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-800/80 backdrop-blur-lg border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <FiShield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TamperProof</span>
            </Link>
            <p className="text-gray-400 mt-2">
              Blockchain-powered document verification system ensuring authenticity and security.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-400 hover:text-white transition-colors">
                  Verify Documents
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="https://github.com/RazaAli313" target="_blank"  className="text-gray-400 hover:text-white transition-colors">
                <FiGithub className="h-5 w-5" />
              </a>
              <a href="https://razaali.me/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/razaali313/"  target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} TamperProof. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Developed by <a href="https://www.linkedin.com/in/razaali313/" target="_blank">Syed Muhammad Raza Ali</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}