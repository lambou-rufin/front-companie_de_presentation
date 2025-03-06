import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ILanguage } from "utils/inteface/interface"; // Assurez-vous que l'interface ILanguage est correcte
import { createLangageDeProgrammation } from "services/langageDeProgrammation"; // Assurez-vous que cette fonction existe

interface AddLanguageProps {
  onAddLanguage: (langage: ILanguage) => void;
  onClose: () => void;
}

const AddLanguage: React.FC<AddLanguageProps> = ({ onAddLanguage, onClose }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nom: "", // Champ "nom" initialisé à une chaîne vide
    },
    validationSchema: Yup.object({
      nom: Yup.string().required("Le nom est requis"), // Validation pour "nom"
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const langageData: ILanguage = { nom: values.nom };
        await createLangageDeProgrammation(langageData);
    
        onAddLanguage(langageData);
      } catch (error) {
      } finally {
        setLoading(false);
        onClose();
      }
    },    
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formNom" className="text-start mt-2">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="nom"
          value={formik.values.nom}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.nom} // Si il y a une erreur de validation, afficher la bordure rouge
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.nom} {/* Message d'erreur pour le champ nom */}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="text-space-between mt-3">
        <Col>
          <Button variant="outlined" type="submit" disabled={loading} className="me-2">
            {loading ? "Chargement..." : "Sauvegarder"} {/* Affiche 'Chargement...' quand en mode chargement */}
          </Button>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddLanguage;
