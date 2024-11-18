import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import Spinner from "shared/components/Spinner/Spinner";
import { AddTutorialProps, ITutorial } from "utils/inteface/interface";
import { TutorialStatus } from "utils/inteface/enum";

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
    onSubmit: (values) => {
      // Call the parent onAddTutorial to add the new tutorial to the list
      onAddTutorial(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* Title field */}
      <Form.Group controlId="formTitle" className="text-start mt-3 mb-3">
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
      <Form.Group controlId="formDescription" className="text-start mt-3 mb-3">
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
      <Form.Group controlId="formDesignation" className="text-start mt-3 mb-3">
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
      <Form.Group controlId="formStatus" className="text-start mt-3 mb-3">
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
      <Form.Group controlId="formCreatedAt" className="text-start mt-3 mb-3">
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
