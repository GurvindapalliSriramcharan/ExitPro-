import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  console.log('FacultyLogin component rendered');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/faculty/login`, { email, password });
      const { branch } = response.data;
      localStorage.setItem('facultyEmail', email);
      localStorage.setItem('facultyBranch', branch);
      alert('Login successful');
      navigate('/faculty-portal');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h1>Faculty Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Faculty email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
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

export default FacultyLogin;
