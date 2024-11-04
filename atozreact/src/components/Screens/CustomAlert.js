import React from 'react';
import './index.css'; 

const CustomAlert = ({ message, onClose, type }) => {
  return (
    <div className={`custom-alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default CustomAlert;
