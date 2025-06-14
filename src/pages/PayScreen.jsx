// PayScreen.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase'
import { useNavigate } from 'react-router-dom';
import GreenBar from '../components/GreenBar'
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';



const PayScreen = () => {
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();

  const sampleOrder = {
    location: 'Engineer Bar',
    items: [
      { name: 'Padthai', qty: 1, price: 45 },
      { name: 'Water', qty: 2, price: 10 },
    ],
  };

  const handlePayment = async () => {
    setPaying(true);
  
    try {
      // Insert order WITHOUT setting queue_number
      const { data: insertedOrders, error: insertError } = await supabase
        .from('orders')
        .insert([
          {
            location: sampleOrder.location,
            items: sampleOrder.items,
          }
        ])
        .select(); // This returns the inserted row including the id
  
      if (insertError) {
        console.error('Insert error:', insertError);
        alert('Error inserting order');
        setPaying(false);
        return;
      }
  
      const newOrder = insertedOrders[0];
      const queueNumber = newOrder.id; // ✅ Using the auto-generated ID
  
      console.log('New order created with queue number:', queueNumber);
  
      // ✅ Navigate to queue screen with the new queue number
      navigate(`/queue/${queueNumber}`);
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Unexpected error occurred');
    }
  
    setPaying(false);
  };

  {/* generate qr-code */}
  const total = sampleOrder.items.reduce((sum, item) => sum + item.price, 0);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
      const payload = generatePayload('0931680267', { amount: total });
      QRCode.toDataURL(payload)
          .then(setQrUrl)
          .catch(console.error);
  }, [total]);

  return (
    <>
    <GreenBar />
      <div className="min-h-screen bg-[#fdf7e3] flex items-start justify-center py-10 px-4">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-md">
          <h1 className="text-2xl font-bold mb-4 border-b border-black pb-2">Confirm Your Order</h1>
          <div className="space-y-2 mb-6"></div>

          {/* List of foods */}
          <ul className="space-y-2 mb-6">
            {sampleOrder.items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.qty}x · ฿{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mb-4">Location: {sampleOrder.location}</p>

          {/* underline */}
          <hr className="border-t border-black mb-4" /> 

          {/* Total */}
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>฿{total}</span>
          </div>
          
          {/* space */}
          {/* <div className="flex flex-col sm:flex-row gap-3 mt-10" /> */}
          
          {/* attaching qr-code */}
          {qrUrl && (
              <div className="flex justify-center my-6">
                  <img
                      src={qrUrl}
                      alt="PromptPay QR"
                      className="w-80 h-80 object-contain"
                  />
              </div>
          )}

          {/* confirm button */}
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
            disabled={paying}
          >
            {paying ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PayScreen;