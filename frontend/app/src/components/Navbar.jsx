import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { FiHome, FiShield, FiFileText, FiUser, FiLogIn } from 'react-icons/fi';

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { path: '/', name: 'Home', icon: <FiHome /> },
    { path: '/about', name: 'About', icon: <FiShield /> },
    { path: '/contact', name: 'Contact', icon: <FiFileText /> },
    { path: '/guide', name: 'Guide', icon: <FiUser /> },
    { path: '/verify', name: 'Verify', icon: <FiShield /> },
  ];

  return (
    <nav className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <FiShield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TamperProof</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to="/login"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center"
              >
                <FiLogIn className="mr-2" /> Sign In
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon would go here */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (would be expanded) */}
    </nav>
  );
}