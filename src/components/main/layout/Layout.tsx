import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "../Sidenav";
import Footer from "./Footer";
import './Layout.css'; // Ensure your CSS file is imported

const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <SideNav />
        <main className="main-content">
          <Outlet /> {/* Allows child routes to be displayed */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
