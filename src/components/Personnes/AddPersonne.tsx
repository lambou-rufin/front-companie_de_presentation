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
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // État pour l'aperçu de l'image

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      phone: '',
      adress: '',
      image: '', // Nouveau champ image
    },
    validationSchema: Yup.object({
      nom: Yup.string()
        .required('Le nom est requis')
        .min(2, 'Le nom doit comporter au moins 2 caractères'),
      prenom: Yup.string().min(2, 'Le prénom doit comporter au moins 2 caractères'),
      email: Yup.string()
        .required("L'email est requis")
        .email('Adresse email invalide'),
      phone: Yup.string()
        .required('Le numéro de téléphone est requis')
        .matches(/^[0-9]+$/, 'Le numéro de téléphone ne peut contenir que des chiffres')
        .min(10, 'Le numéro de téléphone doit comporter au moins 10 chiffres'),
      adress: Yup.string().optional(),
      image: Yup.string().optional(), // Image facultative
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await onAddPerson(values);
        resetForm();
        onClose();
      } finally {
        setLoading(false);
      }
    },
  });

  // Gérer l'aperçu de l'image sélectionnée
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Sélectionner le premier fichier
    if (file) {
      const imageURL = URL.createObjectURL(file); // Créer une URL temporaire pour prévisualiser l'image
      setImagePreview(imageURL);
      formik.setFieldValue('image', file); // Assurez-vous de stocker le fichier dans Formik
    }
  };

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

      <Form.Group controlId="formPrenom" className="text-center mt-3">
        <Form.Label>Prénom:</Form.Label>
        <Form.Control
          type="text"
          name="prenom"
          value={formik.values.prenom}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.prenom}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.prenom}
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

      <Form.Group controlId="formAdress" className="text-center mt-3">
        <Form.Label>Adresse:</Form.Label>
        <Form.Control
          type="text"
          name="adress"
          value={formik.values.adress}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formImage" className="text-center mt-3">
        <Form.Label>Image (télécharger):</Form.Label>
        <Form.Control
          type="file"
          accept="image/*" // Accepter uniquement les images
          onChange={handleImageChange} // Gestionnaire pour l'aperçu de l'image
        />
        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Aperçu"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </div>
        )}
      </Form.Group>

      <Button variant="success" type="submit" className="text-center mt-3" disabled={loading}>
        {loading ? (
          <>
            <Spinner loading={loading} /> {' '}Ajout...
          </>
        ) : (
          'Ajouter'
        )}
      </Button>
    </Form>
  );
};

export default AddPersonne;
