import React from "react";
import "../styles/login.css";

const NotFound = () => (
  <div className="login-bg" style={{ minHeight: "100vh" }}>
    <div className="login-card animate-pop" style={{ maxWidth: 400 }}>
      <div className="login-logo">
        <span className="login-logo-circle"></span>
        <span className="login-logo-text">404</span>
      </div>
      <h1 className="login-title">Page Not Found</h1>
      <p className="login-subtitle">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  </div>
);

export default NotFound;