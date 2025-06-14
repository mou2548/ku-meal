import GreenBar from '../components/GreenBar';
import useNavigationHelper from "../components/NavigateHelper";
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const goToPath = useNavigationHelper();
  const shopId = cartItems[0]?.shop_id;

  return (
    <>
      <GreenBar />
      <div className="min-h-screen bg-[#fdf7e3] flex items-start justify-center py-10 px-4">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">My Cart</h2>
          <div className="space-y-2 mb-6">
            {cartItems.length === 0 && <p className="text-center text-gray-500">Your cart is empty.</p>}
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span>{item.name}</span>
                <div className="flex items-center gap-3">
                  <span>{item.quantity}x · ฿{item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-t border-black mb-4" />
          {/* Total */}
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>฿{totalPrice}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
              onClick={() => goToPath(`/payment/${shopId}`)}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors w-full"
              onClick={() => goToPath('../canteens')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
