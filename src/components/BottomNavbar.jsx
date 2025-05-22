import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaExchangeAlt, FaUserCircle, FaTachometerAlt, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/BottomNavbar.css';

const BottomNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bottom-navbar">
      <NavLink to="/trade" className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}>
        <FaExchangeAlt size={24} className='trade' />
        <span className='trade'>Trade</span>
      </NavLink>
      <NavLink to="/account" className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}>
        <FaUserCircle size={24} />
        <span>Account</span>
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}>
        <FaTachometerAlt size={24} />
        <span>Dashboard</span>
      </NavLink>
      <button className="bottom-nav-link logout-button" onClick={handleAuth}>
        {user ? (
          <>
            <FaSignOutAlt size={24} />
            <span>Logout</span>
          </>
        ) : (
          <>
            <FaSignInAlt size={24} />
            <span>Login</span>
          </>
        )}
      </button>
    </nav>
  );
};

export default BottomNavbar;
