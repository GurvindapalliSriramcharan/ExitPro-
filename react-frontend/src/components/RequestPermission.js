import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './RequestPermission.css';

function RequestPermission() {
  const [reason, setReason] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [location, setLocation] = useState('college'); // college or hostel
  const [otpRecipients, setOtpRecipients] = useState({
    parent: true,
    alternate: false
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('Loading...');

  const email = localStorage.getItem('studentEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/student/request-permission', {
        email,
        reason,
        from_time: fromTime,
        to_time: toTime,
        location,
        otp_recipients: otpRecipients
      });
      setMessage('Request submitted!');
      fetchStatus();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Submission failed');
    }
  };

  const fetchStatus = useCallback(async () => {
    try {
      const response = await axios.get(`/student/status?email=${email}`);
      setStatus(response.data.status);
    } catch (error) {
      setStatus('Error fetching status');
    }
  }, [email]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleOtpRecipientChange = (recipient) => {
    setOtpRecipients(prev => ({
      ...prev,
      [recipient]: !prev[recipient]
    }));
  };

  const getStatusClass = (status) => {
    const lower = status.toLowerCase();
    if (lower.includes('pending')) return 'status-pending';
    if (lower.includes('approved')) return 'status-approved';
    if (lower.includes('rejected')) return 'status-rejected';
    return '';
  };

  return (
    <div className="request-container">
      <h1>Request Outing Permission</h1>
      <div className="location-card card">
        <div className="location-toggle">
          <label className={`toggle-option ${location === 'college' ? 'active' : ''}`}>
            <input
              type="radio"
              name="location"
              value="college"
              checked={location === 'college'}
              onChange={(e) => setLocation(e.target.value)}
            />
            College
          </label>
          <label className={`toggle-option ${location === 'hostel' ? 'active' : ''}`}>
            <input
              type="radio"
              name="location"
              value="hostel"
              checked={location === 'hostel'}
              onChange={(e) => setLocation(e.target.value)}
            />
            Hostel
          </label>
        </div>
      </div>
      <form className="form-card card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for outing..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromTime">Out Time:</label>
          <input
            type="datetime-local"
            id="fromTime"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toTime">In Time:</label>
          <input
            type="datetime-local"
            id="toTime"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            required
          />
        </div>
        <div className="otp-section">
          <h3>Choose to which no OTP needs to be sent:</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={otpRecipients.parent}
                onChange={() => handleOtpRecipientChange('parent')}
              />
              Parent No.
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={otpRecipients.alternate}
                onChange={() => handleOtpRecipientChange('alternate')}
              />
              Alternate No.
            </label>
          </div>
        </div>
        <button type="submit">Submit Request</button>
        <p id="msg">{message}</p>
      </form>
      <div id="status-bar" className="card">
        <p>Status: <span id="status-text" className={getStatusClass(status)}>{status}</span></p>
      </div>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default RequestPermission;