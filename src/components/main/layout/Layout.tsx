// Layout.tsx
import React, { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "../Sidenav";
import Footer from "./Footer";
import './Layout.css'; // Assurez-vous que votre fichier CSS est importé

const Layout: FC = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false); // État pour gérer l'ouverture du Sidenav

  const toggleSideNav = () => {
    setIsSideNavOpen(prev => !prev); // Fonction pour basculer l'état du Sidenav
  };

  return (
    <div className="layout">
      <Header toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} /> {/* Passer les props au Header */}
      <div className={`container ${isSideNavOpen ? 'sidenav-open' : ''}`}>
        <SideNav className={isSideNavOpen ? 'open' : 'closed'} /> {/* Affichage conditionnel du Sidenav */}
        <main className={`main-content ${isSideNavOpen ? 'sidenav-open' : ''}`}>
          <Outlet /> {/* Permet d'afficher les routes enfants */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
