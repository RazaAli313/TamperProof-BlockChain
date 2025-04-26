import { useState, useCallback } from 'react';
import QrScanner from 'react-qr-scanner';

export default function QRScannerCard({ onScan, loading }) {
  const [error, setError] = useState(null);

  const handleScan = useCallback((result) => {
    if (loading) return; // Don't process scans while loading
    
    try {
      if (result && result.text) {
        // Basic validation of scanned data
        const text = result.text.trim();
        if (text.length > 0) {
          onScan(text);
        }
      }
    } catch (err) {
      setError('Failed to process QR code');
      console.error('Scan error:', err);
    }
  }, [onScan, loading]);

  const handleError = useCallback((err) => {
    console.error('QR Scanner error:', err);
    setError(err?.message || "Camera error - please check permissions");
  }, []);

  return (
    <div className="space-y-2">
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        {!loading ? (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
            constraints={{
              facingMode: 'environment', // Prefer rear camera
            }}
          />
        ) : (
          <div className="bg-gray-800 p-8 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Scanner paused during verification...</div>
          </div>
        )}
      </div>
      {error && (
        <div className="bg-red-900/20 border-l-4 border-red-500 p-2 rounded-r-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
