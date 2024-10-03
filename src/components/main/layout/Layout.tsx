import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "../Sidenav";
import Footer from "./Footer";
import './Layout.css'; // Assurez-vous d'importer votre fichier CSS

const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <SideNav />
        <main className="main-content">
          <Outlet /> {/* Permet d'afficher les routes enfants */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
