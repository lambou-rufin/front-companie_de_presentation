import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import ProfileEdit from "./EditProfile";

// Définir l'interface User pour représenter un utilisateur
interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  image?: string;
}

// Définir les props du composant Profile
interface ProfileProps {
  user: User | null; // La prop 'user' peut être un objet 'User' ou 'null'
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Fonction de sauvegarde du profil mis à jour
  const handleSaveUser = (updatedUser: User) => {
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Mettre à jour le localStorage avec le nouvel utilisateur

    toast.success("Profil mis à jour avec succès !", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <Container>
      <ToastContainer />
      <Card className="profile_user">
        <h1 className="text-center mt-3">Profil de {user?.name || "Utilisateur"}</h1>
        <img
          src={user?.image || "/assets/img/developer.jpg"}
          alt="Profil"
          className="profile-image"
        />
        <p>Email: {user?.email || "Pas d'email disponible"}</p>
        <p>Téléphone: {user?.phoneNumber || "Pas de numéro disponible"}</p>
        <button className="edit-button" onClick={() => setShowEditModal(true)}>
          Éditer
        </button>
      </Card>
      <ProfileEdit
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        user={user}
        onSave={handleSaveUser}
      />
    </Container>
  );
};

export default Profile;
