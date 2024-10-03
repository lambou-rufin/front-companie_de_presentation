import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import routes from "../../../router/routes";
import "./Header.css"; // Assurez-vous de lier les styles
import Icon from "shared/components/Icon/Icon";

const Header: React.FC = () => {
  // État pour le toggle du menu
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null); // État pour l'utilisateur

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effet pour récupérer les informations de l'utilisateur au chargement du composant
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Convertir les données stockées en objet
    }
  }, []);

  return (
    <header>
      <ul className="ulhead">
        <li>
          <h1>
            <i>Gestion de présentation</i>
          </h1>
        </li>
        <li>
          {/* Afficher le nom et l'email de l'utilisateur connecté */}
          {user && (
            <span>
              {user.name} {user.email}
            </span>
          )}

          {/* Bouton Toggle pour le menu */}
          <div className="toggle_button" onClick={toggleMenu}>
            <span><Icon name="user" type={'user'}></Icon></span>
          </div>

          {/* Menu déroulant qui s'affiche selon l'état */}
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
