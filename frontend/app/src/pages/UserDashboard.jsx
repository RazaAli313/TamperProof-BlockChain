import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiFileText, FiLogOut, FiDownload, FiShare2 } from 'react-icons/fi';
import DocumentCard from '../components/DocumentCard';
import StatsCard from '../components/StatsCard';

export default function UserDashboard({ clearAuth }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    verifiedDocuments: 0
  });

  const handleLogout = () => {
    clearAuth();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, statsRes] = await Promise.all([
          axios.get('http://localhost:8002/documents', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get('http://localhost:8002/documents/stats', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);
        
        setDocuments(docsRes.data);
        setStats({
          totalDocuments: statsRes.data.totalDocuments,
          verifiedDocuments: statsRes.data.verifiedDocuments
        });
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800/50 border-r border-gray-700/50 p-4 flex flex-col">
        <div className="mb-8 p-4">
          <h1 className="text-xl font-bold text-white">BlockVerify</h1>
          <p className="text-xs text-gray-400">Document Verification System</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <a className="flex items-center px-4 py-3 bg-blue-900/20 text-blue-400 rounded-lg">
            <FiFileText className="mr-3" />
            My Documents
          </a>
          <a className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 rounded-lg transition-colors">
            <FiDownload className="mr-3" />
            Downloads
          </a>
          <a className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 rounded-lg transition-colors">
            <FiShare2 className="mr-3" />
            Shared
          </a>
        </nav>
        
        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">My Documents</h1>
            <p className="text-gray-400">View and manage your verified documents</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatsCard 
              icon={<FiFileText className="h-6 w-6 text-blue-400" />} 
              title="Total Documents" 
              value={stats.totalDocuments} 
            />
            <StatsCard 
              icon={<FiFileText className="h-6 w-6 text-green-400" />} 
              title="Verified" 
              value={stats.verifiedDocuments} 
            />
          </div>

          {/* Documents List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
          >
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <DocumentCard 
                    key={doc._id}
                    title={doc.filename}
                    hash={doc.hash}
                    date={new Date(doc.uploadDate).toLocaleString()}
                    qrUrl={doc.qrUrl}
                    verified={doc.verified}
                    showShareButton
                    downloadUrl={`http://localhost:8002/documents/download/${doc._id}`}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FiFileText className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No documents found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  You haven't uploaded any documents yet. Documents shared with you will appear here.
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}