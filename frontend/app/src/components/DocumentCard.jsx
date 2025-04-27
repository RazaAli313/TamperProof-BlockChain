import { FiFileText } from "react-icons/fi";

export default function DocumentCard({ document, onClick }) {
  return (
    <div
      className="bg-gray-700 hover:bg-gray-600 cursor-pointer p-4 rounded-lg shadow transition"
      onClick={() => onClick(document)}
    >
      <div className="flex items-center space-x-3">
        <FiFileText className="text-blue-400 flex-shrink-0" size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">
            {document.filename}
          </p>
        </div>
      </div>
    </div>
  );
}
