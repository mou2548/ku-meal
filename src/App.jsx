import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Canteens from './pages/Canteens'
import Qr from './pages/QRCode'
import QueueScreen from './pages/Queue'
// import Shop from './pages/Shops'
import PayScreen from './pages/PayScreen'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/payscreen" element={<PayScreen />} />
        <Route path="/queue/:queueNumber" element={<QueueScreen />} />
        <Route path="/canteens" element={<Canteens />} />
        <Route path="/Qrcode" element={<Qr />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
      </Routes>
    </>
  );
}
export default App;
