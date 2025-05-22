import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaExchangeAlt, FaUserCircle, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/BottomNavbar.css';

const BottomNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bottom-navbar">
      <NavLink to="/trade" className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}>
        <FaExchangeAlt size={24} />
        <span>Trade</span>
      </NavLink>
      <NavLink to="/account" className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}>
        <FaUserCircle size={24} />
        <span>Account</span>
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}>
        <FaTachometerAlt size={24} />
        <span>Dashboard</span>
      </NavLink>
      <button className="bottom-nav-link logout-button" onClick={handleLogout}>
        <FaSignOutAlt size={24} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default BottomNavbar;
