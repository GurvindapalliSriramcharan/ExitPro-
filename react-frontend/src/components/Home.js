import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleStudentAction = () => {
    const choice = window.confirm("Press OK to Login, or Cancel to Sign Up.");
    if (choice) {
      navigate('/student-login');
    } else {
      navigate('/student-signup');
    }
  };

  return (
    <div className="home-container">
      <header>
        <img src="https://cdn.prod.website-files.com/60af144c343b5fdc5513a640/62201bb0b4baad0916cfc7bb_03c756_0a279644d7694f22996bd152f6f8b6be_mv2.png" alt="VNRVJIET Logo" />
        <h1>Welcome to Exit-Pro</h1>
      </header>

      <button className="btn" onClick={handleStudentAction}>Student</button>
      <button className="btn" onClick={() => navigate('/parent-verify-otp')}>Parent</button>
      <button className="btn" onClick={() => navigate('/faculty-login')}>Faculty</button>
      <button className="btn" onClick={() => navigate('/security-login')}>Security</button>

      <footer>Project by-- ExitPro 91B8C6</footer>
    </div>
  );
}

export default Home;