// Header.tsx
import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "../../../router/routes";
import "./Header.css";
import Icon from "shared/components/Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  toggleSideNav: () => void; // Propriété pour toggler le Sidenav
  isSideNavOpen: boolean; // Propriété pour savoir si le Sidenav est ouvert
}

const Header: FC<HeaderProps> = ({ toggleSideNav, isSideNavOpen }) => {
  const [isOpen, setIsOpen] = useState(false); // État pour basculer le menu
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [firstChar, setFirstChar] = useState<string>(""); // État pour le premier caractère de l'email

  // Récupérer les informations utilisateur depuis localStorage au chargement du composant
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData); // Convertir les données stockées en objet
      setUser(parsedUser);
      if (parsedUser.email) {
        // Extraire les deux premiers caractères et les mettre en majuscule
        const firstTwoChars = parsedUser.email.substring(0, 2).toUpperCase();
        setFirstChar(firstTwoChars); // Mettre en état les deux premiers caractères
      }
    }
  }, []);  

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={isSideNavOpen ? "header-with-sidenav-open" : ""}>
      <ul className="ulhead">
        <li className="toggle-sidenav">
          <button onClick={toggleSideNav}>{isSideNavOpen ? "✖" : "☰"}</button>
        </li>
        {/* <li>
          <h1>Gestion de présentation</h1>
        </li> */}
        <li className="user-section">
          {/* Afficher le nom et l'email de l'utilisateur */}
          {user && (
            <div className="user-info">
              {/* <span className="user-name">{user.name}</span> */}
              {/* <span className="user-email">{user.email}</span> */}
            </div>
          )}

          {/* Bouton pour basculer le menu */}
          <div
            className="toggle_button"
            onClick={toggleMenu}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : "false"}
          >
            {/* Utiliser le premier caractère au lieu de l'icône */}
            <div className="email-initial">
              <span>{firstChar}</span>
            </div>
          </div>

          {/* Menu déroulant qui s'affiche en fonction de l'état du menu */}
          <div className={`dropdown_menu ${isOpen ? "open" : ""}`}>
            <ul className="uldrop">
              <li>Compte</li>
              <li>
                <div className="email-initial">
                  <span className="toggle_button">{firstChar}</span>
                  {user && (
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link to={routes.LOGOUT} className="link">
                  <Icon name="user" className="text-danger d-flex justify-content-between align-items-center" type="user"/>
                  {/* <FontAwesomeIcon
                    icon={faUserCircle}
                    size="2x"
                    className="text-danger"
                  /> */}
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
