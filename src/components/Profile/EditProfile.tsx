// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Alert, Card, Container } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { updateProfile } from "services/user";
// import "./Profile.css";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phoneNumber?: string;
//   image?: string;
// }

// interface ProfileEditProps {
//   show: boolean;
//   handleClose: () => void;
//   user: User | null;
//   onSave: (updatedUser: User) => void;
// }

// const ProfileEdit: React.FC<ProfileEditProps> = ({ show, handleClose, user, onSave }) => {
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
//   const [password, setPassword] = useState("");
//   const [base64Image, setBase64Image] = useState(user?.image || "");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setName(user?.name || "");
//     setEmail(user?.email || "");
//     setPhoneNumber(user?.phoneNumber || "");
//     setBase64Image(user?.image || "");
//   }, [user]);

//   const handleSave = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const updatedUser = await updateProfile(name, email, phoneNumber, password, base64Image);
//       if (updatedUser) {
//         onSave({
//           id: user?.id || 0,
//           name,
//           email,
//           phoneNumber,
//           image: updatedUser.image,
//         });
//         handleClose();
//       }
//     } catch (err) {
//       setError("Échec de la mise à jour du profil. Veuillez réessayer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setBase64Image(reader.result?.toString() || "");
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Modifier le Profil</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Nom</Form.Label>
//             <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Téléphone</Form.Label>
//             <Form.Control value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Mot de passe</Form.Label>
//             <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Image de profil</Form.Label>
//             <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
//             {base64Image && <img src={base64Image} alt="Prévisualisation" className="preview-image" />}
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="danger" onClick={handleClose} disabled={loading}>Fermer</Button>
//         <Button variant="success" onClick={handleSave} disabled={loading}>{loading ? "Sauvegarde..." : "Sauvegarder"}</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ProfileEdit;
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateProfile } from "services/user";
import { getUserFromToken } from "utils/auth"; // Assure-toi que le chemin est correct
import "./Profile.css";
import { toast } from "react-toastify";

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
  user: User | null;  // Assurez-vous que cette ligne est bien présente
  onSave: (updatedUser: User) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ show, handleClose, onSave }) => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedUser = getUserFromToken();
    if (loggedUser) {
      setUser({ id: parseInt(loggedUser.id), name: loggedUser.email.split("@")[0], email: loggedUser.email });
      setName(loggedUser.email.split("@")[0]);
      setEmail(loggedUser.email);
    }
  }, []);

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateProfile(name, email, phoneNumber, password, base64Image);
      if (updatedUser) {
        onSave({ id: user.id, name, email, phoneNumber, image: updatedUser.image });
        toast.success("Mise à jour du profil reussi."); 
        handleClose();
      }
    } catch (err) {
      toast.error("Échec de la mise à jour du profil. Veuillez réessayer.");
    } finally {
      setLoading(false);
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
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end align-items-center">
      <Button variant="outlined" onClick={handleSave} disabled={loading} style={{ cursor: "pointer", background: "#4265D6", color:'black' }}
      >
        Sauvegarder
        </Button>
        <Button variant="danger" onClick={handleClose} disabled={loading}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEdit;
