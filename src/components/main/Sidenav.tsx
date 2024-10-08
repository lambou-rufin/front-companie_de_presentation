// SideNav.tsx
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";
import routes from "../../router/routes";
import Icon from "../../shared/components/Icon/Icon";
const sariko = require("../../assets/img/sariko.jpg")

const SideNav: FC<{ className: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // État pour gérer l'ouverture du Sidenav

  const toggleSideNav = () => {
    setIsOpen(prev => !prev); // Fonction pour basculer l'état du Sidenav
  };

  return (
    <div className={`sidenav ${className}`}>
     <div className="logoSidenav"><img src={sariko} alt="Logo" className="img-fluid"/>
     </div>
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
        <Link to={routes.ABOUT}>
          <Icon name="setting" className="icon" type="settings" />About
        </Link>
        <Link to={routes.SETTINGS}>
          <Icon name="setting" className="icon" type="settings" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
