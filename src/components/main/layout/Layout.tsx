// import React, { FC, ReactNode } from 'react';
// import Navbar from './Navbar';
// import Header from './Header';
// import Footer from './Footer';
// import End from './End';
// import SideNav from '../Sidenav';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: FC<LayoutProps> = ({ children }) => {
//   return (
//     <div>
//       <Header />
//       <SideNav />
//       <main>{children}</main>
//       <Footer />
//       <End />
//     </div>
//   );
// };

// export default Layout;


import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideNav from '../Sidenav';
import Footer from './Footer';
import End from './End';

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
    <End />
    </div>
  );
};

export default Layout;
