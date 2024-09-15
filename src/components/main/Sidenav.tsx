// src/components/Layout/SideNav.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css'; // Assurez-vous que le chemin est correct et correspond au fichier CSS
import './Dashboard.css';
import routes from '../../router/routes';

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <button className="menu-btn" onClick={toggleSideNav}>
        ☰ 
      </button>
      <nav className="nav-links">
        <Link to={routes.DASHBOARD}>Dashboard</Link>
        <Link to={routes.PERSONNE}>Personne</Link>
        <Link to={routes.TUTORIAL}>Tutoriel</Link>
        <Link to={routes.LANGAGEDEPROGRAMMATION}>Langage</Link>
        <Link to={routes.PROFILE}>Profile</Link>
        <Link to={routes.SETTINGS}>Settings</Link>
      </nav>
    </div>
  );
};

export default SideNav;
