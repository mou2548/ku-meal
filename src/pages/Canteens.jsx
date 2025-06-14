import React, { useState } from 'react';
import { Search } from 'lucide-react';
import GreenBar from '../components/GreenBar'

export default function App() {
    const cardData = [
        {
            title: 'โรงอาหารกลาง 1 (บาร์ใหม่)',
            subtitle: 'จำนวนร้าน: 48',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารกลาง 2 (บาร์ใหม่กว่า)',
            subtitle: 'จำนวนร้าน: 35',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะวิศวกรรมศาสตร์',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะสัตวแพทยศาสตร์',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {            
            title: 'ห้องอาหารแก้วเกษตร',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะบริหารธุรกิจ',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะวิทยาศาสตร์',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะเกษตร',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะประมง',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'ห้องอาหารสหโภชน์',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะสถาปัตยกรรมศาสตร์',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
        {
            title: 'โรงอาหารคณะวนศาสตร์',
            subtitle: 'จำนวนร้าน: 20',
            image: '/public/images/NewBar.jpg',
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = cardData.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            {/* Cards or no-result message */}
            {filteredCards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {filteredCards.map((card, index) => (
                        <div key={index} className="bg-green-400 rounded-xl p-4 flex items-center space-x-4 shadow-md">
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
                        </div>
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