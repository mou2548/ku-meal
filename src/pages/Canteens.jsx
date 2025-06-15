import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import GreenBar from '../components/GreenBar';
import useNavigationHelper from "../components/NavigateHelper";
import { supabase } from '../../utils/supabase';

export default function Canteens() {
  const [canteens, setCanteens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const goToPath = useNavigationHelper();

  useEffect(() => {
    const fetchCanteens = async () => {
      const { data, error } = await supabase.from('canteens').select('*');
      if (error) console.error("Error fetching canteens:", error);
      else setCanteens(data);
    };
    fetchCanteens();
  }, []);

  const filteredCanteens = canteens.filter((canteen) =>
    canteen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <><GreenBar />
    <div className="min-h-screen bg-[#fdf7e3] p-4 md:p-8 flex flex-col">
      

      {/* Search bar */}
      <div className="mb-6">
        <div className="flex items-center bg-white rounded-full px-4 py-3 shadow w-full">
          <Search className="w-5 h-5 text-gray-600 mr-3" />
          <input
            type="text"
            placeholder="ค้นหาโรงอาหาร..."
            className="bg-transparent focus:outline-none w-full text-gray-700 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Canteen cards */}
      {filteredCanteens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCanteens.map((canteen) => (
            <button
              key={canteen.id}
              onClick={() => goToPath(`/shops/${canteen.id}`)}
              className="bg-white rounded-xl p-4 flex items-center space-x-4 shadow-md hover:shadow-lg transition w-full text-left border border-gray-200"
            >
              <img
                src="/images/NewBar.jpg"
                alt={canteen.name}
                className="w-16 h-16 rounded-md object-cover flex-shrink-0"
              />
              <div className="text-black flex-1">
                <div className="font-bold text-lg">{canteen.name}</div>
                <div className="text-sm text-gray-600">เวลาเปิด: {canteen.time}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-10">ไม่พบโรงอาหารที่ตรงกับคำค้น</p>
      )}
    </div>
    <span className="text-xs text-gray-600 opacity-75 flex">ภาพจาก Facebook page Kasetsart University</span>
    </>
  );
}
