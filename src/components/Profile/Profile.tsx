import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import ProfileEdit from "./EditProfile";

// Interface pour représenter un utilisateur
interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  image?: string;
}

// Interface pour les props du composant Profile
interface ProfileProps {
  user?: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erreur de parsing du localStorage", error);
      }
    }
  }, []);

  // Sauvegarder le profil mis à jour
  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profil mis à jour avec succès !", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <Container>
      <ToastContainer />
      <Card className="profile_user">
        <h1 className="text-center mt-3">
          Profil de {user?.name || "Utilisateur"}
        </h1>
        <img
          src={user?.image || "/assets/img/developer.jpg"}
          alt="Profil"
          className="profile-image"
        />
        <p>Email: {user?.email || "Pas d'email disponible"}</p>
        <p>Téléphone: {user?.phoneNumber || "Pas de numéro disponible"}</p>
        <div className="profile-buttons">
          <button
            className="edit-button"
            onClick={() => setShowEditModal(true) }
            style={{ cursor: "pointer", background: "#4265D6", color:'black' }}
          >
            Éditer
          </button>
        </div>
      </Card>
      {showEditModal && (
        <ProfileEdit
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          user={user}
          onSave={handleSaveUser}
        />
      )}
    </Container>
  );
};

export default Profile;
