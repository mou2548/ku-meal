import { Menu, Search } from 'lucide-react'


function SearchBar() {
    return (
        <div className="flex items-center w-full max-w-md mx-auto bg-purple-100 rounded-full px-4 py-2 shadow-sm">
                <input
                    className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
                    placeholder="Search..."
                />
            <Search className="text-gray-400 ml-3" size={20} />
        </div>
  );
} export default SearchBar