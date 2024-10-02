import React from 'react';
import './SweetAlert.css';

interface SweetAlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const SweetAlert: React.FC<SweetAlertProps> = ({ message, type, onClose }) => {
  return (
    <div className={`sweetalert ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SweetAlert;
