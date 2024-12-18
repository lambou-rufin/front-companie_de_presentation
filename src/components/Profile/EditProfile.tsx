// ProfileEdit.tsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface ProfileEditProps {
  show: boolean;
  handleClose: () => void;
  user: { name: string; email: string } | null;
  onSave: (updatedUser: { name: string; email: string }) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ show, handleClose, user, onSave }) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");

  const handleSave = () => {
    const updatedUser = { name, email };
    onSave(updatedUser);  // Appelle la fonction pour sauvegarder les modifications
    handleClose();        // Ferme le modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="success" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEdit;
