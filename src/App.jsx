import React, { useState } from "react";
import Login from "./pages/login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#FBF6E9] flex flex-col overflow-hidden">
      <div className="bg-green-700 h-[6vh] w-full"></div>
      <div className="bg-[#74c09b] px-12 py-6 flex items-center justify-center space-x-6 w-full">
        <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center">
          <span className="text-white text-3xl">🍴</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 ">KUMeal</h1>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <Login onSuccess={() => setLoggedIn(true)} />
      </div>
    </div>
  );
}
