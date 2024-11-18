import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddLanguageProps } from "utils/inteface/interface";
import Spinner from "shared/components/Spinner/Spinner";

const AddLanguage: React.FC<AddLanguageProps> = ({ onAddLanguage, onClose }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nom: "",
    },
    validationSchema: Yup.object({
      nom: Yup.string().required("Le nom est requis"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await onAddLanguage(values);
      } finally {
        setLoading(false);
        onClose();
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formNom" className="text-start mt-3 mb-3">
        <Form.Label>Nom</Form.Label>
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
   
      <Row className="text-space-beetween mt-3">
        <Col>
        <Button variant="success" type="submit" disabled={loading} className="me-2">
          {loading ? <Spinner loading={loading} /> : "Ajouter"}
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
