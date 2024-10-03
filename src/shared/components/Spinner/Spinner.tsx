// src/shared/components/Spinner.tsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Use your preferred spinner from the library
import './Spinner.css'; // Import the CSS file

const Spinner: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <div className={`spinner-container ${loading ? 'show' : ''}`}>
      <ClipLoader color="#007bff" loading={loading} size={50} />
    </div>
  );
};

export default Spinner;
