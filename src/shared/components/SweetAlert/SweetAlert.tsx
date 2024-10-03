import React from 'react';
import './SweetAlert.css'; // Ensure you have the styles

interface SweetAlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const SweetAlert: React.FC<SweetAlertProps> = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'; // Success icon
      case 'error':
        return '❌'; // Error icon
      case 'warning':
        return '⚠️'; // Warning icon
      case 'info':
        return 'ℹ️'; // Info icon
      default:
        return '';
    }
  };

  return (
    <div className={`sweetalert ${type}`}>
      <div className="sweetalert-icon">{getIcon()}</div>
      <p>{message}</p>
      <button className="sweetalert-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default SweetAlert;


