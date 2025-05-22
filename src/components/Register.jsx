import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/login.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Assuming register function can accept fullName, else adjust accordingly
      await register(email, password, fullName);
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card animate-pop" onSubmit={handleSubmit}>
        <div className="login-logo">
          <span className="login-logo-circle"></span>
          <span className="login-logo-text">CredoX</span>
        </div>
        <h1 className="login-title">Create Your Account</h1>
        <p className="login-subtitle">Start your investment journey today.</p>
        {error && <div className="login-error">{error}</div>}
        <div className="login-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            autoFocus
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Your full name"
          />
        </div>
        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@email.com"
          />
        </div>
        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </div>
        <div className="login-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="login-btn">
          Register
        </button>
        <div className="login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
