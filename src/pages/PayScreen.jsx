import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import GreenBar from '../components/GreenBar';
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';
import { useCart } from '../contexts/CartContext';

const PayScreen = () => {
  const { shopId } = useParams();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [paying, setPaying] = useState(false);
  const [shopPromptPay, setShopPromptPay] = useState('');
  const [locationName, setLocationName] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fetch shop PromptPay phone and location name
  useEffect(() => {
    if (!shopId) return;

    const fetchShop = async () => {
      const { data, error } = await supabase
        .from('shops')
        .select('promptpay, name')
        .eq('id', shopId)
        .single();

      if (error) {
        console.error('Error fetching shop data:', error);
        return;
      }
      setShopPromptPay(data.promptpay);
      setLocationName(data.name);
    };

    fetchShop();
  }, [shopId]);

  // Generate QR code when promptpay or total changes
  useEffect(() => {
    if (!shopPromptPay || total === 0) {
      setQrUrl('');
      return;
    }

    const payload = generatePayload(shopPromptPay, { amount: total });
    QRCode.toDataURL(payload)
      .then(setQrUrl)
      .catch(console.error);
  }, [shopPromptPay, total]);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setPaying(true);

    try {
      // Insert order with location and items
      const { data: insertedOrders, error: insertError } = await supabase
        .from('orders')
        .insert([
          {
            location: locationName,
            items: cartItems.map(({ id, name, quantity, price }) => ({
              id,
              name,
              qty: quantity,
              price,
            })),
          },
        ])
        .select();

      if (insertError) {
        console.error('Insert error:', insertError);
        alert('Error inserting order');
        setPaying(false);
        return;
      }

      const newOrder = insertedOrders[0];
      const queueNumber = newOrder.id;

      console.log('New order created with queue number:', queueNumber);
      navigate(`/queue/${queueNumber}`);
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Unexpected error occurred');
    }

    setPaying(false);
  };

  return (
    <>
      <GreenBar />
      <div className="min-h-screen bg-[#fdf7e3] flex items-start justify-center py-10 px-4">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-md">
          <h1 className="text-2xl font-bold mb-4 border-b border-black pb-2">Confirm Your Order</h1>

          <ul className="space-y-2 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>
                  {item.quantity}x · ฿{item.price}
                </span>
              </li>
            ))}
          </ul>

          <p className="mb-4">Location: {locationName || 'Loading...'}</p>

          <hr className="border-t border-black mb-4" />

          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>฿{total.toFixed(2)}</span>
          </div>

          {qrUrl && (
            <div className="flex justify-center my-6">
              <img src={qrUrl} alt="PromptPay QR" className="w-80 h-80 object-contain" />
            </div>
          )}

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
            disabled={paying || total === 0}
          >
            {paying ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PayScreen;
