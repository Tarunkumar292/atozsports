// CustomAlert.js
import React from 'react';
import './index.css'; 

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CustomAlert;
