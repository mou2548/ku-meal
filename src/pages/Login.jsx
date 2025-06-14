import React, { useState } from "react";

export default function Login({ onSuccess }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // เทียบกับข้อมูลที่กำหนดไว้ล่วงหน้า
    if (account === "admin" && password === "1234") {
      alert("เข้าสู่ระบบได้");
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
