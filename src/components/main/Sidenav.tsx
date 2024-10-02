import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import routes from '../../router/routes';
import Icon from '../../shared/components/Icon/Icon';

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Initialement fermé

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <button className="menu-btn" onClick={toggleSideNav}>
        {isOpen ? '✖' : '☰'} {/* Afficher "✖" quand ouvert */}
      </button>
      <nav className="nav-links">
        <Link to={routes.DASHBOARD}>
          <Icon name="home" className="icon" type="home" /> Dashboard
        </Link>
        <Link to={routes.PERSONNE}>
          <Icon name="user" className="icon" type="user" /> Personne
        </Link>
        <Link to={routes.TUTORIAL}>
          <Icon name="book" className="icon" type="book" /> Tutoriel
        </Link>
        <Link to={routes.LANGAGEDEPROGRAMMATION}>
          <Icon name="code" className="icon" type="code" /> Langage
        </Link>
        <Link to={routes.PROFILE}>
          <Icon name="user" className="icon" type="user" /> Profile
        </Link>
        <Link to={routes.SETTINGS}>
          <Icon name="settings" className="icon" type="settings" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
