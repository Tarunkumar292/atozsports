import React, { useState } from 'react';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error('Error response:', text);
            throw new Error('Failed to log in: ' + (text || 'Unknown error'));
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          window.location.href = 'http://localhost:3001/dashboard';
        } else {
          alert('Login failed: Invaild credentials ');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error");
      });
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
