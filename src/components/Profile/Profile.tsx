// Profile.tsx
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import "./Profile.css";
import ProfileEdit from "./EditProfile";

interface ProfileProps {
  user: { name: string; email: string } | null; // Définir les props
}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // Contrôler l'affichage du modal

  // Récupérer les informations utilisateur depuis localStorage au chargement du composant
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData); // Convertir les données stockées en objet
      setUser(parsedUser);
    }
  }, []);

  // Fonction pour sauvegarder les informations de l'utilisateur
  const handleSaveUser = (updatedUser: { name: string; email: string }) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Mettre à jour localStorage
  };

  // Fonction pour ouvrir le modal
  const handleOpenModal = () => setShowEditModal(true);

  // Fonction pour fermer le modal
  const handleCloseModal = () => setShowEditModal(false);

  return (
    <Container>
      <Card className="profile_user">
        <h1 className="text-center mt-3">Profile de {user?.name || "Utilisateur"} </h1>
        <img src="/assets/img/developer.jpg" alt="sary" />
        <p>Email: {user?.email || "Pas d'email disponible"}</p>
        <button className="edit-button" onClick={handleOpenModal}>Editer</button>
      </Card>

      {/* Modal d'édition */}
      <ProfileEdit
        show={showEditModal}
        handleClose={handleCloseModal}
        user={user}
        onSave={handleSaveUser}
      />
    </Container>
  );
};

export default Profile;

