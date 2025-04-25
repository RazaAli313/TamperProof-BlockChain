export default function StatsCard({ icon, title, value, change }) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-blue-500/30 transition-all">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-gray-700/30">
            {icon}
          </div>
          {change && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              change.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}>
              {change}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white mt-4">{value}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    );
  }