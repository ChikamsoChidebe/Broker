import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card animate-pop" onSubmit={handleSubmit}>
        <div className="login-logo">
          <span className="login-logo-circle"></span>
          <span className="login-logo-text">CredoX</span>
        </div>
        <h1 className="login-title">Sign in to CredoX</h1>
        <p className="login-subtitle">Welcome back! Please login to your account.</p>
        {error && <div className="login-error">{error}</div>}
        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            autoFocus
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="you@email.com"
          />
        </div>
        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        <div className="login-link">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;