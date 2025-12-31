import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function ParentVerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/parent/verify-otp`, {
        student_email: email,
        otp
      });
      setMessage('✅ ' + response.data.message);
      setMessageClass('success');
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.error || 'Verification failed'));
      setMessageClass('error');
    }
  };

  return (
    <div className="form-container">
      <h1>Parent OTP Verification</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Student Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit">Verify</button>
        <p id="msg" className={messageClass}>{message}</p>
      </form>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default ParentVerifyOTP;