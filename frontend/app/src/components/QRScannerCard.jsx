import { useState } from 'react';
import QrScanner from 'react-qr-scanner'; 

export default function QRScanner({ onScan }) {
  const [error, setError] = useState(null);

  const handleScan = (result) => {
    if (result && result.text) {
      onScan(result.text); 
    }
  };

  const handleError = (err) => {
    setError(err?.message || "Unknown error");
  };

  return (
    <div className="space-y-2">
      <div className="border rounded overflow-hidden">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
