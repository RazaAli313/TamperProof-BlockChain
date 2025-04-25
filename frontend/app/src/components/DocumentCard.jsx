export default function DocumentCard({ title, hash, date, qrUrl, showShareButton = false }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">Issued: {date}</p>
            <p className="text-xs font-mono text-gray-400 truncate mt-1" title={hash}>
              Hash: {hash}
            </p>
          </div>
          {qrUrl && (
            <div className="flex flex-col items-center">
              <img src={qrUrl} alt="QR Code" className="w-16 h-16" />
              {showShareButton && (
                <button className="mt-1 text-xs text-blue-600 hover:underline">
                  Share
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }