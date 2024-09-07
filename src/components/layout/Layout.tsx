// src/components/layout/Layout.jsx
import React, { FC, ReactNode } from 'react';
import Navbar from './Navbar'; // Assurez-vous que le chemin est correct
import Header from './Header'; // Assurez-vous que le chemin est correct
import Footer from './Footer'; // Assurez-vous que le chemin est correct
import End from './End'; // Assurez-vous que le chemin est correct

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <End />
    </div>
  );
};

export default Layout;

