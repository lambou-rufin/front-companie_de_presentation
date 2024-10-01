// src/components/Dashboard/Dashboard.tsx
import React from 'react';
import SideNav from './Sidenav';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* <SideNav /> */}
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {/* Ajoutez ici le contenu du tableau de bord */}
      </div>
    </div>
  );
};

export default Dashboard;

