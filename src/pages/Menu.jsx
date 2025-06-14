// src/Menu.js
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import GreenBar from '../components/GreenBar';

// นำเข้ารูปภาพที่มีอยู่
import krapaokaiImage from '../components/images/krapaokai.webp';
import kaomunkai from '../components/images/ข้าวมันไก่.jpg';
import kaopud from '../components/images/ข้าวผัด.jpg';
import garlicpork from '../components/images/หมูทอดกระเทียม.webp';
import kapaomoosubkaidao from '../components/images/ข้าวกระเพราหมูสับไข่ดาว.webp';
import kamoo from '../components/images/ข้าวขาหมูพะโล้.webp';

const Menu = () => {
  // แก้ไขบรรทัดนี้: ต้องมี
  const [search,setSearch]= useState('');
  // เพิ่ม state ใหม่สำหรับเก็บจำนวนครั้งที่เลือกอาหารแต่ละชนิด
  // แก้ไขบรรทัดนี้: ต้องมี [itemCounts, setItemCounts]
  const [itemCounts, setItemCounts] = useState({});

  // อัปเดตอาร์เรย์ menuItems โดยใช้ข้อมูลที่คุณให้มาล่าสุด
  const menuItems =[

    {

      id: 1,

      name: 'ข้าวมันไก่',

      image: kaomunkai,

      currentPrice: 114,

      attribution: 'Pixarbay'

    },

    {

      id: 2,

      name: 'ข้าวกระเพราะไก่',

      image: krapaokaiImage,

      currentPrice: 159,

      attribution: 'Cookpad'

    },

    {

      id: 3,

      name: 'ข้าวผัด',

      image: kaopud,

      currentPrice: 119,

      attribution: 'Pixarbay'

    },

    {

      id: 4,

      name: 'ข้าวหมูทอดกระเทียม',

      image: garlicpork,

      currentPrice: 69,

      attribution: 'Sanook'

    },

    {

      id: 5,

      name: 'ข้าวกระเพราหมูสับไข่ดาว',

      image: kapaomoosubkaidao,

      currentPrice: 85,

      attribution: 'Cookpad'

    },

    {

      id: 6,

      name: 'ข้าวขาหมูพะโล้',

      image: kamoo,

      currentPrice: 95,

      attribution: 'Cookpad'

    },

  ];

  const filteredItems = menuItems.filter(item =>
    item.name.includes(search)
  );

  // ฟังก์ชันสำหรับเพิ่มจำนวนอาหารเมื่อคลิกที่การ์ด
  const handleItemClick = (itemId) => {
    setItemCounts(prevCounts => ({
     ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1 // เพิ่มจำนวน, ถ้ายังไม่มีให้เริ่มที่ 0 แล้วเพิ่ม 1
    }));
  };

  // ฟังก์ชันสำหรับลดจำนวนอาหารเมื่อคลิกปุ่ม "เอาออก"
  const handleRemoveItem = (itemId) => {
    setItemCounts(prevCounts => {
      const currentCount = prevCounts[itemId] || 0;
      if (currentCount > 0) {
        return {
         ...prevCounts,
          [itemId]: currentCount - 1 // ลดจำนวนถ้ามากกว่า 0
        };
      }
      return prevCounts; // ไม่ทำอะไรถ้าจำนวนเป็น 0 อยู่แล้ว
    });
  };

  return (
    <div className="min-h-screen bg-[#FEF9F3] p-4">
      {/* แถบสีเขียวด้านบน */}
      <GreenBar/>

      {/* แถบค้นหา */}
      <div className="mt-4 flex items-center bg-white rounded-full shadow px-4 py-2">
        <input
          type="text"
          className="flex-grow outline-none text-gray-700 placeholder-gray-400"
          placeholder="ค้นหาเมนู"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* กริดของรายการเมนู */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            // เพิ่ม hover:scale-105 และ transition-all สำหรับเอฟเฟกต์ "ป๊อปอัป" และเงา
            className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => handleItemClick(item.id)} // เพิ่ม onClick ที่การ์ด
          >
            {/* คอนเทนเนอร์รูปภาพ */}
            <div className="w-full h-40 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-t-lg" />
            </div>
            
            {/* รายละเอียดรายการ */}
            <div className="p-4 flex flex-col items-start">
              <span className="text-lg font-semibold text-gray-900 text-left mb-1">
                {item.name}
              </span>
              <div className="flex items-baseline mb-1">
                <span className="text-xl font-bold text-gray-800">
                  ฿{item.currentPrice}
                </span>
              </div>
              {/* แสดงแหล่งที่มาของรูปภาพอย่างโปร่งใส หากมี */}
              {item.attribution && (
                <span className="text-xs text-gray-600 opacity-75 mt-1 text-left">
                  จาก {item.attribution}
                </span>
              )}

              {/* ส่วนแสดงจำนวนและปุ่ม "เอาออก" */}
              <div className="mt-3 flex items-center justify-between w-full">
                <span className="text-sm text-gray-700 font-medium">
                  จำนวน: {itemCounts[item.id] || 0}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // หยุดการทำงานของ onClick ของการ์ดเมื่อคลิกปุ่ม
                    handleRemoveItem(item.id);
                  }}
                  disabled={(itemCounts[item.id] || 0) === 0} // ปิดใช้งานปุ่มถ้าจำนวนเป็น 0
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