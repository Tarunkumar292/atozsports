import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Screens/Login';
import Dashboard from './components/Screens/Dashboard';
import Category from './components/Screens/Category';
import Profile from './components/Screens/Profile';
import Addnews from './components/Screens/Addnews';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/addnews' element={<Addnews/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
