import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup
    alert('Account created successfully! Welcome to CSIT AI Website Builder.');
    navigate('/builder');
  };

  return (
    <div className="signup-container">
      <div className="signup-card glass-card">
        <div className="signup-header">
          <div className="csit-logo-small">CSIT</div>
          <h2>Create Your Account</h2>
          <p>Start building AI-powered websites in seconds.</p>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              required 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 signup-btn">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/">Log in here</Link></p>
          <Link to="/builder" className="back-link">← Back to Builder</Link>
        </div>
      </div>
    </div>
  );
}
