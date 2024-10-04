import React, { useEffect } from 'react';
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

  useEffect(() => {
    // Set a timer to dismiss the alert after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]); // Dependency array to prevent stale closures

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



