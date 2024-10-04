import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addPersonne } from 'services/personne';
import { IPersonnes } from 'utils/inteface/interface';

interface AddPersonneProps {
  onAddPerson: (person: IPersonnes) => void; // Update to use IPersonnes
  onClose: () => void; // Nouvelle prop pour fermer le modal
}

const AddPersonne: React.FC<AddPersonneProps> = ({ onClose }) => {
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
  const [success, setSuccess] = useState<string | null>(null); // État pour gérer les messages de succès

  const formik = useFormik({
    initialValues: {
      nom: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      nom: Yup.string()
        .required('Le nom est requis')
        .min(2, 'Le nom doit comporter au moins 2 caractères'),
      email: Yup.string()
        .required('L\'email est requis')
        .email('Adresse email invalide'),
      phone: Yup.string()
        .required('Le numéro de téléphone est requis')
        .matches(/^[0-9]+$/, 'Le numéro de téléphone ne peut contenir que des chiffres')
        .min(10, 'Le numéro de téléphone doit comporter au moins 10 chiffres'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addPersonne(values); // Appel au service d'ajout de personne
        resetForm(); // Réinitialise le formulaire après soumission
        setSuccess('Personne ajoutée avec succès!'); // Message de succès
        setError(null); // Réinitialiser l'erreur
        onClose(); // Ferme le modal après l'ajout
      } catch (err) {
        setError('Échec de l\'ajout de la personne.'); // Gérer l'erreur
        setSuccess(null); // Réinitialiser le message de succès
      }
    },
  });

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>} {/* Afficher l'erreur si elle existe */}
      {success && <Alert variant="success">{success}</Alert>} {/* Afficher le succès si il existe */}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formNom" className="text-center mt-3">
          <Form.Label>Nom:</Form.Label>
          <Form.Control
            type="text"
            name="nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.nom}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.nom}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="text-center mt-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone" className="text-center mt-3">
          <Form.Label>Numéro de téléphone:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit" className="text-center mt-3">
          Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default AddPersonne;

