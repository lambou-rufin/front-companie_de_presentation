import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IPersonnes } from 'utils/inteface/interface';
import Spinner from 'shared/components/Spinner/Spinner';

interface AddPersonneProps {
  onAddPerson: (person: IPersonnes) => void;
  onClose: () => void;
}

const AddPersonne: React.FC<AddPersonneProps> = ({ onAddPerson, onClose }) => {
  const [loading, setLoading] = useState(false); // Etat pour le loading
  const [imagePreview, setImagePreview] = useState<string | null>(null); // État pour l'aperçu de l'image

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      phone: '',
      adress: '',
      image: null, // Ajout de l'image ici
    },
    validationSchema: Yup.object({
      nom: Yup.string()
        .required('Le nom est requis'),
      prenom: Yup.string().required("Le prénom est requis"),
      email: Yup.string()
        .required("L'email est requis")
        .email('Adresse email invalide'),
      phone: Yup.string().required("Le contact est requis")
        .required('Le numéro de téléphone est requis')
        .matches(/^[0-9]+$/, 'Le numéro de téléphone ne peut contenir que des chiffres')
        .min(10, 'Le numéro de téléphone doit comporter au moins 10 chiffres'),
      adress: Yup.string().required("L'adresse est requise"),
      image: Yup.mixed().nullable().optional(), // Image facultative
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
      <Form.Group controlId="formNom" className="text-start mt-3">
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

      <Form.Group controlId="formPrenom" className="text-start mt-3">
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

      <Form.Group controlId="formEmail" className="text-start mt-3">
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

      <Form.Group controlId="formPhone" className="text-start mt-3">
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

      <Form.Group controlId="formAdress" className="text-start mt-3">
        <Form.Label>Adresse:</Form.Label>
        <Form.Control
          type="text"
          name="adress"
          value={formik.values.adress}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formImage" className="text-start mt-3">
        <Form.Label>Image:</Form.Label>
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

      <Row className="text-space-beetween mt-3">
        <Col>
          <Button variant="success" type="submit" disabled={loading} className="me-2">
            {loading ? (
              <>
                <Spinner loading={loading} /> {' '}Ajout...
              </>
            ) : (
              'Ajouter'
            )}
          </Button>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddPersonne;
