import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import des styles
import "./Profile.css";
import ProfileEdit from "./EditProfile";

interface ProfileProps {
  user: { name: string; email: string } | null;
}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSaveUser = (updatedUser: { name: string; email: string }) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Afficher un toast de succès
    toast.success("Profil mis à jour avec succès ! 🎉", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleOpenModal = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);

  return (
    <Container>
      <ToastContainer /> {/* Ajoute le conteneur Toast */}
      <Card className="profile_user">
        <h1 className="text-center mt-3">Profile de {user?.name || "Utilisateur"}</h1>
        <img src="/assets/img/developer.jpg" alt="sary" />
        <p>Email: {user?.email || "Pas d'email disponible"}</p>
        <button className="edit-button" onClick={handleOpenModal}>Éditer</button>
      </Card>

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
