import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Portal.css';

function SecurityLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === 'security@vnrvjiet.in' && password === '12345678') {
      // Simple hardcoded login
      localStorage.setItem('securityLoggedIn', 'true');
      navigate('/security-portal');
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="portal-container">
      <h2>Security Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div id="message">{message}</div>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default SecurityLogin;