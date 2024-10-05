import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IPersonnes } from 'utils/inteface/interface';
import Spinner from 'shared/components/Spinner/Spinner';

interface AddPersonneProps {
  onAddPerson: (person: IPersonnes) => void;
  onClose: () => void;
}

const AddPersonne: React.FC<AddPersonneProps> = ({ onAddPerson, onClose }) => {
  const [loading, setLoading] = useState(false); // Ajout de l'état loading

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
        .required("L'email est requis")
        .email('Adresse email invalide'),
      phone: Yup.string()
        .required('Le numéro de téléphone est requis')
        .matches(/^[0-9]+$/, 'Le numéro de téléphone ne peut contenir que des chiffres')
        .min(10, 'Le numéro de téléphone doit comporter au moins 10 chiffres'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); // Active le spinner pendant la soumission
      try {
        await onAddPerson(values); // Ajoute la personne et attend la fin
        resetForm(); // Réinitialise le formulaire après soumission
        onClose(); // Ferme le modal après l'ajout
      } finally {
        setLoading(false); // Désactive le spinner une fois terminé
      }
    },
  });

  return (
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

      <Button variant="success" type="submit" className="text-center mt-3" disabled={loading}>
  {loading ? (
    <>
      <Spinner loading={loading} /> {/* Passez la propriété loading ici */}
      {' '}Ajout...
    </>
  ) : (
    'Ajouter'
  )}
</Button>
    </Form>
  );
};

export default AddPersonne;


