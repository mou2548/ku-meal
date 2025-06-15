import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import GreenBar from '../components/GreenBar';
import { supabase } from '../../utils/supabase';

export default function Shops() {
    const { canteenId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const { data, error } = await supabase
                    .from('shops')
                    .select('*')
                    .eq('canteen_id', canteenId);
    
                if (error) throw error;
                setShops(data);
            } catch (err) {
                console.error('Failed to fetch shops:', err);
            }
        };
    
        fetchShops();
    }, [canteenId]);

    const filteredShops = (shops ?? []).filter((shop) =>
        (shop?.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <><GreenBar />
        <div className="min-h-screen bg-[#fdf7e3] p-4 md:p-8 flex flex-col">
            
            {/* Search bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                    <div className="flex items-center bg-gray-200 rounded-full px-4 py-3 shadow-sm w-full">
                        <Search className="w-5 h-5 text-gray-600 mr-3" />
                        <input
                            type="text"
                            placeholder="ค้นหาร้านค้า"
                            className="bg-transparent focus:outline-none w-full text-gray-700 text-sm md:text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* List or message */}
            {filteredShops.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShops.map((shop) => (
                        <button
                            key={shop.id}
                            onClick={() => navigate(`../menu/${shop.id}`)}
                            className="bg-emerald-500 rounded-xl p-4 flex items-center space-x-4 shadow-md hover:bg-emerald-600 transition-colors w-full text-left"
                        >
                            <img
                                src="/images/NewBar.jpg"
                                alt={shop.name}
                                className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="text-black flex-1">
                                <div className="font-bold text-sm sm:text-base md:text-lg">
                                    {shop.name}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="min-h-screen bg-[#fdf7e3] p-4 sm:p-6 md:p-8 flex flex-col">
                    <p className="text-gray-600 text-center mt-10">ไม่พบร้านค้าที่ตรงกับคำค้น</p>
                </div>
            )}
        </div>
        </>
    );
}
