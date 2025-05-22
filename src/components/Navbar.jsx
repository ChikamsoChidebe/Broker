import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="classical-navbar">
        <div className="classical-navbar-logo">CredoX</div>
        <ul className="classical-navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'classical-active-link' : '')} end>
              Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Portfolio
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/trade" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Trade
            </NavLink>
          </li>
          <li>
            <NavLink to="/market" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Market
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'classical-active-link' : '')}>
              Contact
            </NavLink>
          </li>
          {user && (
            <li>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
        <button className="classical-navbar-menu-btn" onClick={toggleSidebar} aria-label="Toggle menu">
          &#9776;
        </button>
      </nav>

      <div className={`classical-mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="classical-mobile-sidebar-close" onClick={closeSidebar} aria-label="Close menu">
          &times;
        </button>
        <ul>
          <li>
            <NavLink to="/" onClick={closeSidebar} end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" onClick={closeSidebar}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/trade" onClick={closeSidebar}>
              Trade
            </NavLink>
          </li>
          <li>
            <NavLink to="/market" onClick={closeSidebar}>
              Market Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" onClick={closeSidebar}>
              Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" onClick={closeSidebar}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" onClick={closeSidebar}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeSidebar}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeSidebar}>
              Contact
            </NavLink>
          </li>
          {user && (
            <li>
              <button className="logout-btn" onClick={() => { logout(); closeSidebar(); }}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
      {sidebarOpen && <div className="mobile-sidebar-backdrop" onClick={closeSidebar} />}
    </>
  );
};

export default Navbar;
