import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiFileText, FiLogOut, FiShield, FiUsers } from 'react-icons/fi';
import DocumentCard from '../components/DocumentCard';
import SideBar from '../components/SideBar';
import StatsCard from '../components/StatsCard';

export default function AdminDashboard({ clearAuth }) {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    verifiedDocuments: 0,
    pendingVerifications: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchDocuments();
    fetchStats();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:8002/documents', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDocuments(res.data);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:8002/documents/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await axios.post('http://localhost:8002/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setDocuments([res.data, ...documents]);
      setFile(null);
      fetchStats(); // Refresh stats after upload
    } catch (err) {
      alert('Upload failed: ' + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <SideBar>
        <SideBar.Item icon={<FiFileText />} text="Documents" active />
        <SideBar.Item icon={<FiUsers />} text="User Management" />
        <SideBar.Item icon={<FiShield />} text="Verifications" />
        <SideBar.Item 
          icon={<FiLogOut />} 
          text="Logout" 
          onClick={handleLogout}
          className="text-red-400 hover:bg-red-900/20"
        />
      </SideBar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Manage documents and system settings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              icon={<FiFileText className="h-6 w-6 text-blue-400" />} 
              title="Total Documents" 
              value={stats.totalDocuments} 
            />
            <StatsCard 
              icon={<FiShield className="h-6 w-6 text-green-400" />} 
              title="Verified" 
              value={stats.verifiedDocuments} 
            />
            <StatsCard 
              icon={<FiShield className="h-6 w-6 text-yellow-400" />} 
              title="Pending" 
              value={stats.pendingVerifications} 
            />
            <StatsCard 
              icon={<FiUsers className="h-6 w-6 text-purple-400" />} 
              title="Users" 
              value={stats.totalUsers} 
            />
          </div>

          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiUpload className="mr-2 text-blue-400" />
              Upload New Document
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.div whileHover={{ scale: 1.01 }} className="w-full">
                <input
                  type="file"
                  id="document-upload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                />
                <label
                  htmlFor="document-upload"
                  className={`block w-full p-4 rounded-lg border-2 border-dashed ${
                    file ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                  } cursor-pointer transition-all`}
                >
                  {file ? (
                    <div className="text-center">
                      <p className="text-blue-300 font-medium">{file.name}</p>
                      <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-300">Click to select file</p>
                      <p className="text-sm text-gray-500">or drag and drop</p>
                    </div>
                  )}
                </label>
              </motion.div>
              
              <motion.button
                onClick={handleUpload}
                disabled={loading || !file}
                whileHover={!loading && file ? { scale: 1.02 } : {}}
                whileTap={!loading && file ? { scale: 0.98 } : {}}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-all ${
                  loading ? 'bg-blue-700' : !file ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  'Upload Document'
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Documents List */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FiFileText className="mr-2 text-blue-400" />
              Issued Documents
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {documents.map((document) => (
                <DocumentCard key={document._id} document={document} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
