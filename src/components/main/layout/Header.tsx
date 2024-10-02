import { Link } from "react-router-dom";
import React, { useState } from "react";
import routes from "../../../router/routes";
import "./Header.css"; // Assurez-vous de lier les styles
import Icon from "shared/components/Icon/Icon";

const Header: React.FC = () => {
  // État pour le toggle du menu
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <ul className="ulhead">
        <li>
          <h1>
            <i>Gestion de presentation</i>
          </h1>
        </li>
        <li>
          {/* Bouton Toggle pour le menu */}
          <div className="toggle_button" onClick={toggleMenu}>
            <span><Icon name="user " type={'user'}></Icon></span>
          </div>

          {/* Menu déroulant qui s'affiche selon l'état */}
          <div className={`dropdown_menu ${isOpen ? "open" : ""}`}>
            <ul className="uldrop">
              <li>
                <Link to={routes.ABOUT}>About</Link>
              </li>
              <li>
                <Link to={routes.LOGOUT}>Déconnexion</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;

