import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import GreenBar from '../components/GreenBar';
import krapaokaiImage from '../components/images/krapaokai.webp';
import kaomunkai from '../components/images/ข้าวมันไก่.jpg';
import kaopud from '../components/images/ข้าวผัด.jpg';
import garlicpork from '../components/images/หมูทอดกระเทียม.webp';
import kapaomoosubkaidao from '../components/images/ข้าวกระเพราหมูสับไข่ดาว.webp';
import kamoo from '../components/images/ข้าวขาหมูพะโล้.webp';
const Menu = () => {
  const [search, setSearch] = useState('');

  const menuItems = [
    { id: 1, name: 'ข้าวมันไก่ จาก Pixarbay', image: kaomunkai },
    { id: 2, name: 'กะเพราไก่ จาก Cookpad', image: krapaokaiImage },
    { id: 3, name: 'ข้าวผัด จาก Pixarbay', image: kaopud },
    { id: 4, name: 'หมูกระเทียม จาก Sanook', image: garlicpork },
    { id: 5, name: 'ข้าวกระเพราหมูสับไข่ดาว จาก Cookpad', image: kapaomoosubkaidao },
    { id: 6, name: 'ข้าวขาหมู จาก Cookpad', image: kamoo },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#FEF9F3] p-4">
      {/* Top green bar */}
      <GreenBar/>

      {/* Search bar with menu icon */}
      <div className="mt-4 flex items-center bg-white rounded-full shadow px-4 py-2">
        <input
          type="text"
          className="flex-grow outline-none text-gray-700 placeholder-gray-400"
          placeholder="ค้นหาเมนู"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Grid of menu items */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-green-200 rounded-lg flex flex-col items-center p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center mb-2">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <span className="mt-1 text-base text-center font-medium text-gray-800">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
