import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://ean.gocoolcare.com/user/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAlertMessage('Login Success');
        setAlertType('success'); 
        setShowAlert(true);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } else {
        setAlertMessage('Login failed: Invalid credentials');
        setAlertType('error'); 
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Login failed: Invalid credentials');
      setAlertType('error'); 
      setShowAlert(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-box text-center rounded">
        <img
          src="/assets/logo.png"
          className="logo my-3"
          alt="A TO Z Sports Logo"
        />
        <div className="line"></div>
        <h1 className="mb-3">Welcome Back !!</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="text-start w-100">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="text-start w-100">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <button type="submit" className="btn btn-warning mb-3 w-100">Login</button>
          </div>
        </form>
      </div>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          type={alertType} 
        />
      )}
    </div>
  );
};

export default Login;
