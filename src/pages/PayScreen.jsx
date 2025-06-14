// PayScreen.jsx
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase'
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>

      <ul className="space-y-2 mb-4">
        {sampleOrder.items.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.qty}x · ฿{item.price}</span>
          </li>
        ))}
      </ul>

      <p className="mb-4">Location: {sampleOrder.location}</p>

      <button
        onClick={handlePayment}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        disabled={paying}
      >
        {paying ? 'Processing...' : 'Pay & Get Queue Number'}
      </button>
    </div>
  );
};

export default PayScreen;