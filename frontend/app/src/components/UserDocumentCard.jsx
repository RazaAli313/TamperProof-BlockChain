import { FiCheckCircle } from 'react-icons/fi';

export default function UserDocumentCard({ title, hash, date, verified, openModal }) {
  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-700 transition-colors cursor-pointer"
      onClick={() => openModal({ title, hash, uploadDate: date, verified })} // <-- here
    >
      <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
      
      <div className="mt-4">
        <p className="text-xs text-gray-300 truncate">Hash: {hash}</p>
      </div>
      {verified && (
        <div className="mt-4 text-green-400 flex items-center">
          <FiCheckCircle className="mr-2" />
          <span>Verified</span>
        </div>
      )}
    </div>
  );
}
