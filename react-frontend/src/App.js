import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import RequestPermission from './components/RequestPermission';
import ParentVerifyOTP from './components/ParentVerifyOTP';
import FacultyPortal from './components/FacultyPortal';
import FacultyLogin from './components/FacultyLogin';
import SecurityPortal from './components/SecurityPortal';
import SecurityLogin from './components/SecurityLogin';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/request-permission" element={<RequestPermission />} />
          <Route path="/parent-verify-otp" element={<ParentVerifyOTP />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-portal" element={<FacultyPortal />} />
          <Route path="/security-login" element={<SecurityLogin />} />
          <Route path="/security-portal" element={<SecurityPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
