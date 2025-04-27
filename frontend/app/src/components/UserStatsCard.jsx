// src/components/UserStatsCard.jsx
export default function UserStatsCard({ title, value, icon }) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="ml-2 text-lg font-medium text-white">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    );
  }
  
