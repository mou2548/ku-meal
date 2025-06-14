import { useEffect, useState } from 'react'
// import { supabase } from '../utils/supabase'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Canteens from './pages/Canteens'
import Qr from './pages/QRCode'
import Queue from './pages/Queue'
import Shop from './pages/Shops'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PayScreen />} />
        <Route path="/queue/:queueNumber" element={<QueueScreen />} />
        <Route path="/canteens" element={<Canteens />} />
        <Route path="/Qrcode" element={<Qr />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
