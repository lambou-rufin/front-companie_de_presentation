import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "../Sidenav";
import Footer from "./Footer";

const Layout: FC = () => {
  return (
    <div>
      {/* Navigation ou Header ici */}
      <Header />
      <SideNav />
      <main>
        <Outlet /> {/* Permet d'afficher les routes enfants */}
      </main>
      {/* Footer ici */}
      <Footer />
    </div>
  );
};

export default Layout;
