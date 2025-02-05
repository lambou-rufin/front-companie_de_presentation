import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import ProfileEdit from "./EditProfile";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  image?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
        <h1 className="text-center mt-3">Profil de {user?.name || "Utilisateur"}</h1>
        <img src={user?.image || "/assets/img/developer.jpg"} alt="Profil" className="profile-image" />
        <p>Email: {user?.email || "Pas d'email disponible"}</p>
        <p>Téléphone: {user?.phoneNumber || "Pas de numéro disponible"}</p>
        <button className="edit-button" onClick={() => setShowEditModal(true)}>Éditer</button>
      </Card>
      <ProfileEdit show={showEditModal} handleClose={() => setShowEditModal(false)} user={user} onSave={handleSaveUser} />
    </Container>
  );
};

export default Profile;
