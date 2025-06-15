// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import GreenBar from '../components/GreenBar';

export default function Orders() {
  const { shopId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Orders.useEffect shopId=', shopId);
    if (!shopId) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('shop_id', shopId)
        .order('created_at', { ascending: true });
      if (error) console.error('fetch orders error', error);
      else {
        console.log('fetched orders', data);
        setOrders(data);
      }
      setLoading(false);
    };
    fetch();
  }, [shopId]);

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <><GreenBar />
      <div className="min-h-screen bg-[#fdf7e3] p-4">
        <h1 className="text-2xl font-bold mb-4">Orders for This Shop</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="text-sm text-gray-500">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : ''}
                  </span>
                </div>
                <div className="mb-2">
                  {Array.isArray(order.items) ? order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{it.name}</span>
                      <span>{it.qty}× · ฿{it.price}</span>
                    </div>
                  )) : <p className="text-sm text-red-500">No items data</p>}
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>฿{Array.isArray(order.items)
                    ? order.items.reduce((s, it) => s + (it.qty||0) * (it.price||0), 0)
                    : 0}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
