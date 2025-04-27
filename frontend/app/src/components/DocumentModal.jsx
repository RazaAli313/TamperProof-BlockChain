import {  FiCheckCircle } from 'react-icons/fi';

export default function DocumentModal({ isOpen, closeModal, document }) {
  if (!isOpen || !document) return null;

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Document Details</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-200">
            X
          </button>
        </div>
        <div className="mt-4">
          <p className="text-white font-medium">Title: {document.title || 'Untitled'}</p>
          {/* Add 'truncate' class to ensure the hash doesn't overflow */}
          <p className="text-gray-400 text-sm mt-2 truncate" style={{ maxWidth: '100%' }}>
            Hash: {document.hash || 'No hash available'}
          </p>
          
          {document.verified && (
            <div className="mt-4 text-green-400 flex items-center">
              <FiCheckCircle className="mr-2" />
              Verified
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
