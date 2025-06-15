// /pages/HomeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/canteens')}
      className="fixed bottom-5 left-5 bg-white text-green-600 border border-green-500 hover:bg-green-100 rounded-full shadow-md p-3 z-50"
    >
      <Home className="w-6 h-6" />
    </button>
  );
};

export default HomeButton;
