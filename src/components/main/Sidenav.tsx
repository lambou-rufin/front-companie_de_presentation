// src/components/Layout/SideNav.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css'; // Assurez-vous que le chemin est correct et correspond au fichier CSS
import './Dashboard.css';

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <button className="menu-btn" onClick={toggleSideNav}>
        ☰ Menu
      </button>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </div>
  );
};

export default SideNav;
