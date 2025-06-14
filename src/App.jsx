import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import './App.css'

import { Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import Menu from './pages/Menu'
// import Canteens from './pages/Canteens'
// import QueueScreen from './pages/Queue'
import PayScreen from './pages/PayScreen'
// import Qr from './pages/QRCode'
// import Shop from './pages/Shops'


function App() {
  return (
    <>
      <h1>YO</h1>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/payscreen" element={<PayScreen />} />
          {/* <Route path="/queue/:queueNumber" element={<QueueScreen />} /> */}
          {/* <Route path="/canteens" element={<Canteens />} /> */}
          {/* <Route path="/Qrcode" element={<Qr />} /> */}
          {/* <Route path="/shop" element={<Shop />} /> */}
        </Routes>
    </>
  );
}
export default App;
