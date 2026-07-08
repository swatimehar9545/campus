import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/logo.svg" alt="CSIT Logo" />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue to CSIT AI Builder</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-submit-btn">Sign In</button>
        </form>

        <div className="login-footer">
          Don't have an account? <a href="#">Sign up</a>
        </div>
        <div className="login-back">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
