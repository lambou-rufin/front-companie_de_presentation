import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "services/user";
import "./Profile.css";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  image?: string;
}

interface ProfileEditProps {
  show: boolean;
  handleClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ show, handleClose, user, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [base64Image, setBase64Image] = useState(user?.image || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhoneNumber(user?.phoneNumber || "");
    setBase64Image(user?.image || "");
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateProfile(name, email, phoneNumber, password, base64Image);
      if (updatedUser) {
        onSave({
          id: user?.id || 0,
          name,
          email,
          phoneNumber,
          image: updatedUser.image,
        });
        handleClose();
      }
    } catch (err) {
      setError("Échec de la mise à jour du profil. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBase64Image(reader.result?.toString() || "");
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image de profil</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {base64Image && <img src={base64Image} alt="Prévisualisation" className="preview-image" />}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose} disabled={loading}>Fermer</Button>
        <Button variant="success" onClick={handleSave} disabled={loading}>{loading ? "Sauvegarde..." : "Sauvegarder"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEdit;
