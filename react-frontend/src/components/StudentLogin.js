import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Append domain to roll number to create full email
    const fullEmail = email.includes('@') ? email : `${email}@vnrvjiet.in`;
    
    try {
      // eslint-disable-next-line no-unused-vars
      await axios.post(`${process.env.REACT_APP_API_URL}/student/login`, {
        email: fullEmail,
        password
      });
      localStorage.setItem('studentEmail', fullEmail);
      alert('Login successful!');
      navigate('/request-permission');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Roll Number:</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your roll number (e.g., 24071a6691)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p id="msg">{message}</p>
      </form>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default StudentLogin;