import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import './SpinnerWithBar.css';

interface SpinnerWithBarProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerWithBarProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="spinner-overlay" style={{ boxShadow: 'none' }}>
      <CirclesWithBar 
        height="80" 
        width="80" 
        color="#221961" 
        barColor="black"
        ariaLabel="loading-indicator"
        wrapperStyle={{ transition: 'all 5s ease-in-out', borderWidth: '70px', boxShadow: 'none' }} 
      />
    </div>
  );
};

export default Spinner;
