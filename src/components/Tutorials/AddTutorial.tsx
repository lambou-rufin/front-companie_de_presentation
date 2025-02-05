import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import Spinner from "shared/components/Spinner/Spinner";
import { TutorialStatus } from "utils/inteface/enum";
import { createTutorial } from "services/tutorial";
import { ITutorial } from "utils/inteface/interface";

 interface AddTutorialProps {
  onAddTutorial: (tutorial: ITutorial) => void;
  onClose: () => void;
}

export const AddTutorial: FC<AddTutorialProps> = ({ onAddTutorial, onClose }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<ITutorial>({
    initialValues: {
      title: '',
      description: '',
      designation: '',
      status: TutorialStatus.EN_ATTENTE, // Default value
      createdAt: new Date(), // Current date
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Le titre est requis'),
      description: Yup.string().required('La description est requise'),
      designation: Yup.string().required('La désignation est requise'),
      status: Yup.mixed<TutorialStatus>()
        .oneOf(Object.values(TutorialStatus), 'Statut invalide')
        .required('Le statut est requis'),
      createdAt: Yup.date().required('La date est requise'),
    }),
    onSubmit: async (values) => {
      setLoading(true); // Affiche le spinner
      try {
        const response = await createTutorial(values); // Appel de la fonction pour créer le tutoriel
        onAddTutorial(response); // Passer la réponse à onAddTutorial (ajouter à la liste)
        setLoading(false); // Arrêter le chargement une fois que l'appel est terminé
        onClose(); // Fermer le modal ou effectuer une action après ajout
      } catch (error) {
        console.error("Erreur lors de la création du tutoriel :", error);
        setLoading(false); // Arrêter le chargement même en cas d'erreur
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* Title field */}
      <Form.Group controlId="formTitle" className="text-start mt-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Description field */}
      <Form.Group controlId="formDescription" className="text-start mt-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Designation field */}
      <Form.Group controlId="formDesignation" className="text-start mt-2">
        <Form.Label>Designation</Form.Label>
        <Form.Control
          type="text"
          name="designation"
          value={formik.values.designation}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.designation}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.designation}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Status field */}
      <Form.Group controlId="formStatus" className="text-start mt-2">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.status}
        >
          {Object.values(TutorialStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.status}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Date field */}
      <Form.Group controlId="formCreatedAt" className="text-start mt-2">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="createdAt"
          value={formik.values.createdAt.toISOString().substring(0, 10)}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.createdAt}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.createdAt && String(formik.errors.createdAt)}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Action buttons */}
      <Row className="text-space-between mt-3">
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
