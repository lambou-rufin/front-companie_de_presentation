import React from 'react';
import './Logo.css';
import logo from '../../assets/images/logo.png'; // Importez le logo ici

const Logo: React.FC = () => {
  return <img src={logo} alt="Logo" className="logo" />;
};

export default Logo;
