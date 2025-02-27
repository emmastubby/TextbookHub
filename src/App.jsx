import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import the NavBar component
import Home from './pages/Home';
import FindBook from './pages/FindBook';
import SellBook from './pages/SellBook';
import Messages from './pages/Messages';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<FindBook />} />
        <Route path="/sell" element={<SellBook />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
};

export default App;

