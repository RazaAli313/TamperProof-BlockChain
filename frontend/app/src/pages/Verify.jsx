import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiCheckCircle, FiXCircle, FiHash } from 'react-icons/fi';
import QRScannerCard from '../components/QRScannerCard';

export default function Verify() {
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hashInput, setHashInput] = useState('');
  const [activeTab, setActiveTab] = useState('qr');

  const verifyDocument = async (method, data) => {
    setLoading(true);
    setVerificationResult(null);
    
    try {
      let endpoint = method === 'file' ? '/verify/file' : '/verify/hash';
      let res;
      
      if (method === 'file') {
        const formData = new FormData();
        formData.append('file', data);
        res = await axios.post(`http://localhost:8000${endpoint}`, formData);
      } else {
        res = await axios.get(`http://localhost:8000${endpoint}`, {
          params: { document_hash: data }
        });
      }

      setVerificationResult({
        valid: res.data.verified,
        hash: res.data.document_hash,
        details: {
          filename: res.data.filename,
          timestamp: res.data.timestamp,
          qr_code_url: res.data.qr_code_url
        }
      });
    } catch (err) {
      setVerificationResult({
        valid: false,
        hash: method === 'hash' ? hashInput : '',
        details: {
          filename: method === 'file' ? data?.name : 'Unknown',
          timestamp: new Date().toISOString(),
          qr_code_url: null
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    verifyDocument('file', file);
  };

  const handleQRScan = (data) => {
    if (!data) return;
    verifyDocument('hash', data);
  };

  const handleHashSubmit = (e) => {
    e.preventDefault();
    if (hashInput.trim()) {
      verifyDocument('hash', hashInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Document Verification</h1>
        <p className="text-gray-400 mb-8">Verify document authenticity using blockchain technology</p>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          {['qr', 'file', 'hash'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              {tab === 'qr' ? 'QR Code' : tab === 'file' ? 'File Upload' : 'Hash Input'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'qr' && (
            <motion.div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiCheckCircle className="mr-2 text-blue-400" /> Scan QR Code
              </h2>
              <QRScannerCard onScan={handleQRScan} loading={loading} />
            </motion.div>
          )}

          {activeTab === 'file' && (
            <motion.div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiUpload className="mr-2 text-blue-400" /> Upload Document
              </h2>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="document-upload"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                  disabled={loading}
                />
                <label
                  htmlFor="document-upload"
                  className={`block cursor-pointer p-4 rounded-lg ${loading ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                  {loading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-2" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUpload className="h-10 w-10 text-gray-500 mb-2" />
                      <span className="text-gray-300">Click to select file</span>
                      <span className="text-sm text-gray-500">Supports PDF, DOCX, JPG, PNG</span>
                    </div>
                  )}
                </label>
              </div>
            </motion.div>
          )}

          {activeTab === 'hash' && (
            <motion.div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiHash className="mr-2 text-blue-400" /> Enter Document Hash
              </h2>
              <form onSubmit={handleHashSubmit}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={hashInput}
                    onChange={(e) => setHashInput(e.target.value)}
                    placeholder="Enter document hash"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !hashInput.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {/* Result */}
        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${verificationResult.valid ? 'bg-green-900/20 border-l-4 border-green-500' : 'bg-red-900/20 border-l-4 border-red-500'}`}
          >
            <div className="flex items-start mb-4">
              <div
                className={`p-2 rounded-full ${verificationResult.valid ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'} mr-4`}
              >
                {verificationResult.valid ? <FiCheckCircle className="h-6 w-6" /> : <FiXCircle className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {verificationResult.valid ? 'Document Verified' : 'Document Not Verified'}
                </h3>
                <p className={verificationResult.valid ? 'text-green-400' : 'text-red-400'}>
                  {verificationResult.valid
                    ? 'This document is authentic and verified on the blockchain.'
                    : 'This document could not be verified.'}
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Document Name</p>
                  <p className="font-medium">{verificationResult.details.filename}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Verification Date</p>
                  <p className="font-medium">
                    {new Date(verificationResult.details.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">Document Hash</p>
                <code className="block bg-gray-700 rounded-lg p-2 text-blue-400 text-sm font-mono overflow-x-auto">
                  {verificationResult.hash}
                </code>
              </div>

              {verificationResult.details.qr_code_url && (
                <div className="flex justify-center">
                  <img
                    src={verificationResult.details.qr_code_url}
                    alt="Document QR Code"
                    className="w-32 h-32"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by Blockchain Document Verification System</p>
        </div>
      </motion.div>
    </div>
  );
}
