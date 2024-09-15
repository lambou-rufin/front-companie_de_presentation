// src/components/Dashboard/Profile.tsx

import React from "react";
import { Card, Container } from "react-bootstrap";
import "./Profile.css";

const Profile: React.FC = () => {
  return (
    <Container>
      <h1 className="text-center mt-3">Profile</h1>
      <p>Here you can view and edit your profile information.</p>
      <Card className="profile_user">
        <section className="containera">
          <img src="/assets/img/developer.jpg" alt="sary" />
          <article className="content">
            <h1>Moi c'est Rufin 🔥</h1>
            <h4>Développeur fullstack🥂</h4>
          </article>
        </section>
      </Card>
      {/* Ajoutez le formulaire ou les détails du profil ici */}
    </Container>
  );
};

export default Profile;
