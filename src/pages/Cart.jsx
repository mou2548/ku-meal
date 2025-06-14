import GreenBar from '../components/GreenBar';
import useNavigationHelper from "../components/NavigateHelper";


export default function Cart() {
    // item in the cart goes here
    const cartItems = [
        { name: 'PadKrapow', quantity: 1, price: 45 },
        { name: 'Kaiyang', quantity: 2, price: 80 },
    ];
    const goToPath = useNavigationHelper();

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <GreenBar />
            <div className="min-h-screen bg-[#fdf7e3] flex items-start justify-center py-10 px-4">
                
                <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-md">
                    
                    <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">My Cart</h2>
                    
                    <div className="space-y-2 mb-6">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span>{item.quantity}x · ฿{item.price}</span>
                            
                                    
                            
                            </div>
                        ))}
                    </div>

                    <hr className="border-t border-black mb-4" />
                    {/* Total */}
                    <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span>฿{total}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-10" />

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
                                onClick={() => goToPath('../payscreen')}>
                            Checkout
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors w-full"
                                onClick={() => goToPath('../canteens')}>
                            Continue Shopping
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}