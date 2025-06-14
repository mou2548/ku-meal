import { useState } from "react";
import { supabase } from "../../utils/supabase";
import useNavigationHelper from "../components/NavigateHelper";

export default function LoginWrapper() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-green-100 to-amber-100 flex flex-col overflow-hidden">
      <div className="bg-green-700 h-[6vh] w-full"></div>
      <div className="bg-[#74c09b] px-12 py-6 flex items-center justify-center space-x-6 w-full shadow-lg">
        <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-3xl">🍴</span>
        </div>
        <h1 className="text-5xl font-bold text-white drop-shadow">KU-Meal</h1>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <Login />
      </div>
    </div>
  );
}

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const goToPath = useNavigationHelper();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", account)
      .eq("password", password); // 🔴 plain password match (only for prototyping)

    if (error) {
      setError("ระบบมีปัญหา");
      console.error(error);
      return;
    }

    if (data.length === 1) {
      alert("เข้าสู่ระบบสำเร็จ");
      goToPath("/canteens");
    } else {
      setError("บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <form
      className="space-y-8 w-full max-w-xl px-16 py-12 bg-white shadow-xl rounded-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10">
        WELCOME TO KU-Meal
      </h2>

      <div>
        <label className="block text-xl font-semibold mb-2 text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          placeholder="กรอกชื่อผู้ใช้ของคุณ"
        />
      </div>
      <div>
        <label className="block text-xl font-semibold mb-2 text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm font-medium text-center -mt-4">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-md text-xl hover:bg-green-600 transition"
      >
        Sign in
      </button>
    </form>
  );
}
