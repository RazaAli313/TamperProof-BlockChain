import { FiHome, FiFileText, FiUsers, FiShield, FiSettings, FiLogOut } from 'react-icons/fi';

export default function SideBar({ children }) {
  return (
    <div className="w-64 bg-gray-800/80 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-xl font-bold text-white">TamperProof</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {children}
      </div>
    </div>
  );
}

SideBar.Item = function SideBarItem({ icon, text, active = false, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg mb-1 transition-all ${
        active 
          ? 'bg-blue-600/20 text-blue-400' 
          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
      } ${className}`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
};