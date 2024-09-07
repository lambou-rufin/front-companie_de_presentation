// src/components/Dashboard/Logout.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../services/user';// Assurez-vous de créer une fonction pour effacer le token

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await clearToken(); // Effacez le token (cette fonction doit être créée dans authService)
        navigate('/login'); // Redirection vers la page de connexion après la déconnexion
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
