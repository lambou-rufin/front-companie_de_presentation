import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Personne from '../components/Personnes';
import Login from '../components/Users/Login';
import Register from '../components/Users/Register/Register';
import Tutorial from '../components/Tutorials';
import routes from './routes';
import LangageDeProgrammation from '../components/LangageDeProgrammation';
import Layout from '../components/layout/Layout';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.PERSONNE} element={<Personne />} />
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<Register />} />
          <Route path={routes.TUTORIAL} element={<Tutorial />} />
          <Route path={routes.LANGAGEDEPROGRAMMATION} element={<LangageDeProgrammation />} />
          {/* <Route path="*" element={<Navigate to={routes.HOME} />} /> */}
          <Route path="*" element={<Navigate to={routes.LOGIN} />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
