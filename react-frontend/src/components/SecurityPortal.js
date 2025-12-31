import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Portal.css';

function SecurityPortal() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('securityLoggedIn')) {
      navigate('/security-login');
      return;
    }
    loadRequests();
  }, [navigate]);

  const loadRequests = async () => {
    try {
      const response = await axios.get('/security/accepted-outings');
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

  const handleCheckout = async (id, rollNo, name) => {
    try {
      await axios.post('/security/checkout', { id, rollNo, name });
      setMessage('Checked out successfully');
      loadRequests(); // Refresh the list
    } catch (error) {
      setMessage('Checkout failed: ' + error.response?.data?.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('securityLoggedIn');
    navigate('/');
  };

  return (
    <div className="portal-container">
      <h2>Accepted Outing Permissions</h2>
      <div className="portal-header-row">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div id="message">{message}</div>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr><td colSpan="4">No accepted outings.</td></tr>
            ) : (
              requests.map(req => (
                <tr key={req.id}>
                  <td>{req.roll_no}</td>
                  <td>{req.name}</td>
                  <td className="status-accepted">Accepted Outing</td>
                  <td>
                    <button className="checkout-btn" onClick={() => handleCheckout(req.id, req.roll_no, req.name)}>Check Out</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default SecurityPortal;