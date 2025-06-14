import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import useNavigationHelper from "../components/NavigateHelper";
export default function LoginWrapper() {
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

function Login({ onSuccess }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate()
  const goToPath = useNavigationHelper();
  const handleSubmit = (e) => {
    e.preventDefault();
    // เทียบกับข้อมูลที่กำหนดไว้ล่วงหน้า
    if (account === "admin" && password === "1234") {
      alert("เข้าสู่ระบบได้");
      goToPath('./canteens')
      //   // Normally you'd validate login here
        // navigate('/menu') // move to Menu page
      // // }
      onSuccess();
    } else {
      alert("บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <form className="space-y-8 w-full max-w-xl px-16 py-12" onSubmit={handleSubmit}>
      <h2 className="text-4xl font-extrabold text-center mb-10">WELCOME</h2>
      <div>
        <label className="block text-xl font-semibold mb-2">Nontri-Account</label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
        />
      </div>
      <div>
        <label className="block text-xl font-semibold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#5dc093] text-white py-3 rounded-md text-xl hover:bg-green-600 transition"
      >
        Sign in
      </button>
    </form>
  );
}
