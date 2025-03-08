import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { presentTutorial } from "services/tutorial";
import { TutorialStatus } from "utils/inteface/enum";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPersonneList from "services/personne";
import getLangageDeProgrammationList from "services/langageDeProgrammation";
import { IPresenterTutorialRequest } from "utils/inteface/interface";
import { Navigate, useNavigate } from "react-router-dom";

const PresenterTutorial: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [personnes, setPersonnes] = useState<any[]>([]);
  const [langages, setLangages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const personnesData = await getPersonneList();
      const langagesData = await getLangageDeProgrammationList();
      setPersonnes(personnesData);
      setLangages(langagesData);
    }

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      designation: "",
      description: "",
      published: false,
      status: "en cours", // exemple de statut initial
      createdAt: new Date(),
      selectedPersonne: "",
      selectedLangage: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Le titre est requis"),
      designation: Yup.string().optional(),
      description: Yup.string().optional(),
      status: Yup.string().oneOf(
        Object.values(TutorialStatus),
        "Statut invalide"
      ),
      createdAt: Yup.date().required("La date est requise"),
      selectedPersonne: Yup.string().required("La personne est requise"),
      selectedLangage: Yup.string().required("Le langage est requis"),
    }),
    onSubmit: async (values) => {
      // Créez un objet qui correspond exactement aux attentes de l'API
      const tutorialRequest: IPresenterTutorialRequest = {
        title: values.title,
        designation: values.designation,
        description: values.description,
        status: values.status as TutorialStatus,
        createdAt: values.createdAt,
        selectedPersonne: values.selectedPersonne,
        selectedLangage: values.selectedLangage,
        personneId: values.selectedPersonne, // Supposé être le même que selectedPersonne
        langageId: values.selectedLangage, // Supposé être le même que selectedLangage
      };

      console.log(tutorialRequest); // Vérifiez l'objet avant l'envoi

      setLoading(true);
      try {
        await presentTutorial(tutorialRequest); // Passez l'objet avec les bonnes propriétés
        toast.success("Tutoriel ajouté avec succès !");
        navigate("/tutoriel");
        onClose();
      } catch (error) {
        toast.error("Erreur lors de l'ajout du tutoriel.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <ToastContainer />
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
      {/* Person selection */}
      <Form.Control
        as="select"
        name="selectedPersonne"
        value={formik.values.selectedPersonne}
        onChange={formik.handleChange}
        isInvalid={!!formik.errors.selectedPersonne}
        className="text-start mt-2"
      >
        <option value="">-- Sélectionnez une personne --</option>
        {personnes.map((personne) => (
          <option key={personne.pers_id} value={personne.pers_id}>
            {personne.nom}
          </option>
        ))}
      </Form.Control>

      <Form.Control
        as="select"
        name="selectedLangage"
        value={formik.values.selectedLangage}
        onChange={formik.handleChange}
        isInvalid={!!formik.errors.selectedLangage}
        className="text-start mt-2"
      >
        <option value="">-- Sélectionnez un langage --</option>
        {langages.map((langage) => (
          <option key={langage.langage_id} value={langage.langage_id}>
            {langage.nom}
          </option>
        ))}
      </Form.Control>

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
          value={
            formik.values.createdAt
              ? new Date(formik.values.createdAt).toISOString().substring(0, 10)
              : ""
          }
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.createdAt}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.createdAt ? String(formik.errors.createdAt) : ""}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Action buttons */}
      <Row className="text-space-between mt-3">
        <Col>
          <Button variant="success" type="submit" className="me-2" style={{ cursor: "pointer", background: "#4265D6" , color:'black'}}
          >
            Ajouter
          </Button>

          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PresenterTutorial;
