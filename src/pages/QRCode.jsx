import React, { useEffect, useState, useRef } from 'react';
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';

function QrDisplay() {
  const [qrUrl, setQrUrl] = useState('');
  const qrRef = useRef(null);

  useEffect(() => {
    const payload = generatePayload('0931680267', { amount: 25 });
    QRCode.toDataURL(payload)
      .then(setQrUrl)
      .catch(console.error);
  }, []);

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'promptpay-qr.png';
    link.click();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF2E4]">
      <div className="w-[320px] text-center px-6 py-8 rounded-xl shadow-md bg-[#FAF2E4]">
        <div className="bg-[#4CAF50] w-full h-[30px] rounded-t-md mb-4" />
        <h1 className="text-5xl font-bold text-gray-800 ">KUMeal</h1>
        <h1 className="text-3xl font-bold text-green-700 mb-4">Qr Code</h1>
        {qrUrl && (
          <img
            ref={qrRef}
            src={qrUrl}
            alt="PromptPay QR"
            className="w-48 h-48 mx-auto mb-6"
          />
        )}
        <button
          onClick={handleSave}
          className="w-full py-2 mb-2 bg-white border border-black text-black rounded-md font-semibold"
        >
          Save Qr Code
        </button>
      </div>
    </div>
  );
}

export default QrDisplay;

