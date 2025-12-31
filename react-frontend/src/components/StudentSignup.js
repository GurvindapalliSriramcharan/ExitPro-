import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function StudentSignup() {
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    branch: '',
    email: '',
    parent_phone: '',
    alternative_phone: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/student/signup`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage('✅ ' + response.data.message);
      alert('✅ Signup successful!');
    } catch (error) {
      setMessage('❌ Signup failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="form-container">
      <h3>Student Signup</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roll_no"
          placeholder="Roll No"
          value={formData.roll_no}
          onChange={handleChange}
          required
        />
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="CSE AIML">CSE AIML</option>
          <option value="CSE DS">CSE DS</option>
          <option value="EEE">EEE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
          <option value="ROBOTICS">ROBOTICS</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="parent_phone"
          placeholder="Parent Phone No"
          value={formData.parent_phone}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="alternative_phone"
          placeholder="Alternative Phone No"
          value={formData.alternative_phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div id="msg">{message}</div>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default StudentSignup;