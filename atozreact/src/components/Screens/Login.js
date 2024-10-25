import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://atoz.gocoolcare.com/user/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log(token);
        navigate('/dashboard');
      } else {
        alert('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please check your credentials or try again later.');
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
    </div>
  );
};

export default Login;
