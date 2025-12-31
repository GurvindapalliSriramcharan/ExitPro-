import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Portal.css';

function FacultyPortal() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();
  const facultyBranch = localStorage.getItem('facultyBranch');
  const facultyEmail = localStorage.getItem('facultyEmail');


  const loadRequests = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/faculty/pending-requests?branch=${encodeURIComponent(facultyBranch)}`);
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  }, [facultyBranch]);

  useEffect(() => {
    if (!facultyBranch) {
      navigate('/faculty-login');
      return;
    }
    loadRequests();
  }, [facultyBranch, loadRequests, navigate]);

  const handleDecision = async (id, decision) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/faculty/approve`, { id, decision, facultyBranch });
      alert(`${decision} successfully`);
      loadRequests();
    } catch (error) {
      alert('Error: ' + error.response?.data?.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('facultyBranch');
    localStorage.removeItem('facultyEmail');
    navigate('/faculty-login');
  };

  return (
    <div className="portal-container">
      <h1>Faculty Pending Approvals</h1>
      <div className="portal-header-row">
        <span>Logged in as: <strong>{facultyEmail} ({facultyBranch})</strong></span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="requests-list">
        {requests.length === 0 ? (
          <div className="empty-message">No pending requests for your department.</div>
        ) : (
          <div className="cards-grid">
            {requests.map(req => (
              <div key={req.id} className="card card-approval">
                <div className="card-row"><span className="card-label">Email:</span> <span>{req.email}</span></div>
                <div className="card-row"><span className="card-label">Branch:</span> <span>{req.branch}</span></div>
                <div className="card-row"><span className="card-label">Reason:</span> <span>{req.reason}</span></div>
                <div className="card-row"><span className="card-label">From:</span> <span>{req.from}</span></div>
                <div className="card-row"><span className="card-label">To:</span> <span>{req.to}</span></div>
                <div className="card-actions">
                  <button className="approve-btn" onClick={() => handleDecision(req.id, 'Approved')}>✅ Approve</button>
                  <button className="reject-btn" onClick={() => handleDecision(req.id, 'Rejected')}>❌ Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default FacultyPortal;