import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GreenBar from '../components/GreenBar';
import { supabase } from '../../utils/supabase.js';

const QueueScreen = () => {
  const { queueNumber } = useParams();  // Get queueNumber from URL params (string)

  const [orderData, setOrderData] = useState(null);
  const [peopleAhead, setPeopleAhead] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!queueNumber) return;

    const fetchOrderData = async () => {
      setLoading(true);

      // Parse queueNumber as integer since URL params are strings
      const queueNumInt = parseInt(queueNumber, 10);

      // 1. Fetch this order by id (auto increment primary key)
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', queueNumInt)
        .single();

      if (error || !order) {
        console.error('Order not found:', error);
        setOrderData(null);
        setLoading(false);
        return;
      }

      setOrderData(order);

      // 2. Count people ahead in the queue (id less than current)
      const { data: queueList, error: listError } = await supabase
        .from('orders')
        .select('id')
        .lt('id', queueNumInt);

      if (listError) {
        console.error('Error fetching queue list:', listError);
        setPeopleAhead(0);
      } else {
        setPeopleAhead(queueList.length);
      }

      setLoading(false);
    };

    fetchOrderData();
  }, [queueNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEF9F3] flex flex-col items-center justify-center">
        <p className="text-lg">Loading queue info...</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#FEF9F3] flex flex-col items-center justify-center">
        <p className="text-red-500 font-semibold">No order found for this queue number.</p>
      </div>
    );
  }

  const estimateTime = peopleAhead * 5; // 5 mins per queue
  const totalPrice = orderData.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#FEF9F3] flex flex-col items-center">
      <GreenBar />

      <h1 className="mt-8 text-4xl font-bold text-green-600">Queue</h1>

      <div className="my-6">
        <div className="w-24 h-24 border-4 border-green-600 rounded-full flex items-center justify-center">
          {/* Display id as queue number */}
          <span className="text-3xl font-bold text-green-600">{orderData.id}</span>
        </div>
      </div>

      <div className="flex space-x-2 mb-8 text-lg">
        <span className="font-medium">Estimate Time:</span>
        <span className="font-semibold">{estimateTime} - {estimateTime + 5} mins.</span>
      </div>

      <div className="w-11/12 max-w-md border-2 border-black rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Order</h2>
        <ul className="space-y-2 mb-4">
          {orderData.items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="text-lg">{item.name}</span>
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
                {item.qty}x · ฿{item.price}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium mb-1">
          Location: <span className="font-semibold">{orderData.location}</span>
        </p>

        <p className="text-right font-semibold mt-2">Total: ฿{totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default QueueScreen;