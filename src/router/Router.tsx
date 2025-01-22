// import React, { FC } from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Home from '../components/Home';
// import Login from '../components/Users/Login';
// import Register from '../components/Users/Register/Register';
// import Tutorial from '../components/Tutorials';
// import routes from './routes';
// import LangageDeProgrammation from '../components/LangageDeProgrammation';
// import Layout from '../components/main/layout/Layout';
// import Dashboard from '../components/main/Dashboard';
// import Profile from '../components/Profile/Profile';
// import Settings from '../components/Settings/Settings';
// import Logout from '../components/Logout/Logout';
// import Personne from '../components/Personnes/Personne';
// import About from '../components/About';
// import ForgotPassword from '../components/Users/ForgotPass';

// const Router: FC = () => {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path={routes.HOME} element={<Home />} />
//           <Route path={routes.LOGIN} element={<Login />} />
//           <Route path={routes.REGISTER} element={<Register />} />
//           <Route path={routes.DASHBOARD} element={<Dashboard />} />
//           <Route path={routes.PERSONNE} element={<Personne />} />
//           <Route path={routes.TUTORIAL} element={<Tutorial />} />
//           <Route path={routes.LANGAGEDEPROGRAMMATION} element={<LangageDeProgrammation />} />
//           <Route path={routes.PROFILE} element={<Profile />} />
//           <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />
//           <Route path={routes.SETTINGS} element={<Settings />} />
//           <Route path={routes.LOGOUT} element={<Logout />} />
//           <Route path={routes.ABOUT} element={<About />} />
//           <Route path="*" element={<Navigate to={routes.HOME} />} />
//           <Route path="*" element={<Navigate to={routes.LOGIN} />} />

//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// };

// export default Router;

import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Users/Login';
import Register from '../components/Users/Register/Register';
import Tutorial from '../components/Tutorials';
import routes from './routes'; // Vérifie que l'objet routes est bien importé et contient toutes les routes
import LangageDeProgrammation from '../components/LangageDeProgrammation';
import Dashboard from '../components/main/Dashboard';
import Profile from '../components/Profile/Profile';
import Settings from '../components/Settings/Settings';
import Logout from '../components/Logout/Logout';
import Personne from '../components/Personnes/Personne';
import About from '../components/About';
import ForgotPassword from '../components/Users/ForgotPass';
import Layout from '../components/main/layout/Layout'; // Vérifie que Layout utilise Outlet pour afficher les composants enfants
import PresenterTutorial from 'components/Tutorials/PresenterTutorial/PresenterTutorial';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes sans Layout */}
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />

        {/* Routes avec Layout */}
        <Route element={<Layout />}>
          <Route path={routes.DASHBOARD} element={<Dashboard />} />
          <Route path={routes.PERSONNE} element={<Personne />} />
          <Route path={routes.TUTORIAL} element={<Tutorial />} />
          <Route path={routes.PRESENTERTUTORIAL} element={<PresenterTutorial />} />
          <Route path={routes.LANGAGEDEPROGRAMMATION} element={<LangageDeProgrammation />} />
          <Route path={routes.PROFILE} element={<Profile user={null} />} />
          <Route path={routes.SETTINGS} element={<Settings />} />
          <Route path={routes.LOGOUT} element={<Logout />} />
          <Route path={routes.ABOUT} element={<About />} />
        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to={routes.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

