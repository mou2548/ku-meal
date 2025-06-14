import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PayScreen from './pages/PayScreen';
import QueueScreen from './pages/Queue';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PayScreen />} />
        <Route path="/queue/:queueNumber" element={<QueueScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
