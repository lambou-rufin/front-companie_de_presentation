import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "shared/components/Spinner/Spinner";
import { AddPersonneProps } from "utils/inteface/interface";
import { addPersonne } from "services/personne";
import { toast } from "react-toastify";

const AddPersonne: React.FC<AddPersonneProps> = ({
  onAddPerson,
  onClose,
  onSuccessToast,
}) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle the form submission
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      // Appel à l'API pour ajouter la personne
      const addedPerson = await addPersonne(values);

      // Appeler la fonction du parent pour mettre à jour l'état global
      onAddPerson(addedPerson);

      // Réinitialiser et fermer le modal
      resetForm();
      onClose();
      setImagePreview(null);
      toast.success("Personne ajoutée avec succès !");
    } catch (error) {
      console.error("Error adding person:", error);
      toast.error("Erreur lors de l'ajout de la personne.");
    } finally {
      setLoading(false);
    }
  };

  // Formik hook with validation and form submission
  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      email: "",
      phoneNumber: "",
      adress: "",
      image: null,
    },
    validationSchema: Yup.object({
      nom: Yup.string().required("Le nom est requis"),
      prenom: Yup.string().required("Le prénom est requis"),
      email: Yup.string()
        .email("Adresse email invalide")
        .required("L'email est requis"),
      phoneNumber: Yup.string()
        .matches(
          /^[0-9]+$/,
          "Le numéro de téléphone ne peut contenir que des chiffres"
        )
        .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres")
        .required("Le numéro de téléphone est requis"),
      adress: Yup.string().required("L'adresse est requise"),
      image: Yup.mixed().nullable().optional(),
    }),
    onSubmit: handleSubmit, // Pass the handleSubmit function to Formik
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* Champs du formulaire */}
      <Form.Group controlId="formNom" className="text-start mt-2">
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

      <Form.Group controlId="formPrenom" className="text-start mt-2">
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

      <Form.Group controlId="formEmail" className="text-start mt-2">
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

      <Form.Group controlId="formPhone" className="text-start mt-2">
        <Form.Label>Numéro de téléphone:</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.phoneNumber}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phoneNumber}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formAdress" className="text-start mt-2">
        <Form.Label>Adresse:</Form.Label>
        <Form.Control
          type="text"
          name="adress"
          value={formik.values.adress}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.adress}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.adress}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formImage" className="text-start mt-2">
        <Form.Label>Image:</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Aperçu"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </div>
        )}
      </Form.Group>

      {/* Boutons */}
      <Row className="text-space-between mt-3">
        <Col>
          <Button
            variant="outlined"
            type="submit"
            disabled={loading}
            className="me-2"
            style={{ cursor: 'pointer', background:'#4265D6'}}
          >
            {loading ? (
              <>
                <Spinner loading={loading} /> Ajout...
              </>
            ) : (
              "Sauvegarder"
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