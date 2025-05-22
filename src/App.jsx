import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/Portfolio';
import Trade from './components/Trade';
import MarketData from './components/MarketData';
import Orders from './components/Orders';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import About from './components/About';
import Contact from './components/Contact';
import Account from './components/Account';
import Deposit from './components/Deposit';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #fffefa 0%, #e9e2d0 100%)"
      }}>
        <div style={{
          position: "relative",
          width: 100,
          height: 100,
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/* Rotating single-color glowing ring */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 70,
            height: 70,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "5px solid #ffe9a7",
            borderTop: "5px solid #bfa14a",
            borderRight: "5px solid #ffe9a7",
            borderBottom: "5px solid #ffe9a7",
            borderLeft: "5px solid #ffe9a7",
            boxShadow: "0 0 32px 8px #ffe9a7, 0 0 16px 4px #bfa14a",
            animation: "spinRing 1.2s linear infinite"
          }} />
          {/* Glowing dot in the center */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fffefa 60%, #bfa14a 100%)",
            boxShadow: "0 0 40px 16px #bfa14a, 0 0 24px 8px #ffe9a7, 0 0 60px 24px #ffe9a7",
            animation: "centerPulse 1.3s ease-in-out infinite alternate"
          }} />
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.35rem",
          color: "#4B5320",
          letterSpacing: "1px",
          textShadow: "0 0 8px #274472"
        }}>
          Loading Credox...
        </div>
        <style>
          {`
            @keyframes centerPulse {
              0% { box-shadow: 0 0 40px 16px #bfa14a, 0 0 24px 8px #ffe9a7, 0 0 60px 24px #ffe9a7; }
              100% { box-shadow: 0 0 64px 32px #ffe9a7, 0 0 40px 16px #bfa14a, 0 0 90px 36px #bfa14a; }
            }
            @keyframes spinRing {
              0% { transform: translate(-50%, -50%) rotate(0deg);}
              100% { transform: translate(-50%, -50%) rotate(360deg);}
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/market" element={<MarketData />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        {/* Add more routes as needed */}
      </Routes>
      <BottomNavbar />
    </Router>
  );
};

export default App;
