import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GreenBar from '../components/GreenBar';
import { supabase } from '../../utils/supabase';

const Menu = () => {
  const { shopId } = useParams(); // get shopId from URL param
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState('');
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      if (!shopId) return;
      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('shop_id', shopId);

      if (error) {
        console.error('Error fetching menus:', error);
      } else {
        setMenus(data);
      }
    };

    fetchMenus();
  }, [shopId]);

  // filter menus by search term
  const filteredItems = menus.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (itemId) => {
    setItemCounts(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleRemoveItem = (itemId) => {
    setItemCounts(prev => {
      const count = prev[itemId] || 0;
      if (count > 0) {
        return {...prev, [itemId]: count - 1};
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-[#FEF9F3] p-4">
      <GreenBar />

      {/* Search bar */}
      <div className="mt-4 flex items-center bg-white rounded-full shadow px-4 py-2">
        <input
          type="text"
          className="flex-grow outline-none text-gray-700 placeholder-gray-400"
          placeholder="ค้นหาเมนู"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Menu grid */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => handleItemClick(item.id)}
          >
            <div className="w-full h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-t-lg"
                onError={e => { e.currentTarget.src = '/images/default-food.jpg'; }} // fallback image
              />
            </div>
            <div className="p-4 flex flex-col items-start">
              <span className="text-lg font-semibold text-gray-900 mb-1">{item.name}</span>
              <div className="flex items-baseline mb-1">
                <span className="text-xl font-bold text-gray-800">฿{item.price}</span>
              </div>
              {item.credit && (
                <span className="text-xs text-gray-600 opacity-75 mt-1">จาก {item.credit}</span>
              )}

              <div className="mt-3 flex items-center justify-between w-full">
                <span className="text-sm text-gray-700 font-medium">จำนวน: {itemCounts[item.id] || 0}</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveItem(item.id);
                  }}
                  disabled={(itemCounts[item.id] || 0) === 0}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  เอาออก
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
