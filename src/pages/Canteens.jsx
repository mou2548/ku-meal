import React, { useState } from 'react';
import { Search } from 'lucide-react';
import GreenBar from '../components/GreenBar'
import useNavigationHelper from "../components/NavigateHelper";

export default function App() {
    const cardData = [
        {
            title: 'โรงอาหารกลาง 1 (บาร์ใหม่)',
            subtitle: 'เวลาเปิด: 06.00 - 18.00น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารกลาง 2 (บาร์ใหม่กว่า)',
            subtitle: 'เวลาเปิด: 06.00 - 14.00น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะวิศวกรรมศาสตร์',
            subtitle: 'เวลาเปิด: 05.30 - 18.00น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะสัตวแพทยศาสตร์',
            subtitle: 'เวลาเปิด: 05.00 - 19.00น.',
            image: '/public/images/NewBar.jpg',
        },
        {            
            title: 'ห้องอาหารแก้วเกษตร',
            subtitle: 'เวลาเปิด: 08.30 - 14.00 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะบริหารธุรกิจ',
            subtitle: 'เวลาเปิด: 06.30 - 18.30 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะวิทยาศาสตร์',
            subtitle: 'เวลาเปิด: 06.30 - 17.00 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะเกษตร',
            subtitle: 'เวลาเปิด: 07.00 - 15.00 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะประมง',
            subtitle: 'เวลาเปิด: 06.00 - 14.00 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'ห้องอาหารสหโภชน์',
            subtitle: 'เวลาเปิด: 07.00 - 14.00 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะสถาปัตยกรรมศาสตร์',
            subtitle: 'เวลาเปิด: 05.00 - 18.00 น.',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะวนศาสตร์',
            subtitle: 'เวลาเปิด: 06.00 - 15.00 น.',
            image: '/public/images/NewBar.jpg',
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = cardData.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const goToPath = useNavigationHelper();

    return (
        <div className="min-h-screen bg-[#fdf7e3] p-4 md:p-8 flex flex-col">
            {/* Search bar row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                    <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 shadow-sm w-full">
                        <Search className="w-5 h-5 text-gray-600 mr-3" />
                        <input
                            type="text"
                            placeholder="Search for a canteen"
                            className="bg-transparent focus:outline-none w-full text-gray-700 text-sm md:text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            
            {/* buttons or no-result message */}
            {filteredCards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCards.map((card, index) => (
                        <button 
                            key={index}
                            onClick={() => goToPath('../menu')}
                            className="bg-emerald-500 rounded-xl p-4 flex items-center space-x-4 shadow-md hover:bg-emerald-600 transition-colors w-full text-left"
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="text-black flex-1">
                                <div className="font-bold text-sm sm:text-base md:text-lg">
                                    {card.title}
                                </div>
                                <div className="text-sm sm:text-sm md:text-base">
                                    {card.subtitle}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="min-h-screen bg-[#fdf7e3] p-4 sm:p-6 md:p-8 flex flex-col">
                    <p className="text-gray-600 text-center mt-10">
                        No canteens found.
                    </p>
                </div>
            )}
        </div>
    );
}