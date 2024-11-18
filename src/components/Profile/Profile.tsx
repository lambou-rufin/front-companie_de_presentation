import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import "./Profile.css";

interface ProfileProps {
  user: { name: string; email: string } | null; // Définir les props
}

const Profile: React.FC<ProfileProps> = ({}) => {
 const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [firstChar, setFirstChar] = useState<string>(""); // État pour le premier caractère de l'email

  // Récupérer les informations utilisateur depuis localStorage au chargement du composant
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData); // Convertir les données stockées en objet
      setUser(parsedUser);
      if (parsedUser.email) {
        setFirstChar(parsedUser.email.charAt(0).toUpperCase()); // Extraire et mettre en majuscule le premier caractère
      }
    }
  }, []);

  return (
    <Container>
      <h1 className="text-center mt-3">Profile de {user?.name || "Utilisateur"} </h1>
      {/* <p>Here you can view and edit your profile information.</p> */}
      <Card className="profile_user">
        <section className="containera">
          <img src="/assets/img/developer.jpg" alt="sary" />
          <article className="content">
            <h1>Moi c'est {user?.name || "Utilisateur"} 🔥</h1>
            <h4>Développeur fullstack🥂</h4>
            <p>Email: {user?.email || "Pas d'email disponible"}</p>
          </article>
        </section>
      </Card>
    </Container>
  );
};

export default Profile;
