// Header.tsx
import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "../../../router/routes";
import "./Header.css";

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
        setFirstChar(parsedUser.email.charAt(0).toUpperCase()); // Extraire et mettre en majuscule le premier caractère
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
        <li>
          <h1>
            <i>Gestion de présentation</i>
          </h1>
        </li>
        <li className="user-section">
          {/* Afficher le nom et l'email de l'utilisateur */}
          {user && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
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
