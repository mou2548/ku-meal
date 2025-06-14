import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartIcon() {
  const { totalItemsCount } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
      aria-label="Go to cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h11l1.5-7H7z"
        />
      </svg>

      {/* Badge for total items */}
      {totalItemsCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 rounded-full px-1.5 text-xs font-bold leading-none text-white">
          {totalItemsCount}
        </span>
      )}
    </button>
  );
}