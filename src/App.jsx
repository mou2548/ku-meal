import './App.css'

import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Canteens from './pages/Canteens'
import Qr from './pages/QRCode'
import QueueScreen from './pages/Queue'
import Shops from './pages/Shops'
import PayScreen from './pages/PayScreen'
import Cart from './pages/Cart'
import CartIcon from './pages/CartIcon';
import { CartProvider } from './contexts/CartContext';


function App() {
  return (
    <CartProvider>
      <CartIcon /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu/:shopId" element={<Menu />} />
        <Route path="/payment/:shopId" element={<PayScreen />} />
        <Route path="/queue/:queueNumber" element={<QueueScreen />} />
        <Route path="/canteens" element={<Canteens />} />
        <Route path="/Qrcode" element={<Qr />} />
        <Route path="/shops/:canteenId" element={<Shops />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}
export default App;
