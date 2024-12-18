import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form as BootstrapForm,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import routes from "../../../router/routes";
import Layout from "../../main/layout/Layout"; // Décommentez si vous utilisez Layout
import { register } from "../../../services/user"; 
import "./Register.css";
import { convertToBase64 } from "utils/convertToBase64";
const logo = require("../../../assets/img/logo.jpg");

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  image: Yup.mixed()
    .test(
      "fileSize",
      "Le fichier est trop volumineux",
      (value: any | undefined) => {
        if (!value) return true;
        return value.size <= 2896 * 2896; // 1 Mo maximum
      }
    )
    .test(
      "fileType",
      "Format de fichier non pris en charge",
      (value: any | undefined) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    image: File | null;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setError(null); // Réinitialiser les erreurs
  
      // Convertir l'image en Base64 si elle existe
      const base64Image = values.image
        ? await convertToBase64(values.image)
        : null;
  
      // Appeler la fonction `register` avec les paramètres appropriés
      await register(values.name, values.email, values.password, base64Image);
  
      // Redirection ou gestion après une inscription réussie
      navigate("/login");
    } catch (error) {
      setError("Failed to register. Please check your details and try again.");
    }
  };
  

  // Convertir le fichier sélectionné en Base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Image(reader.result as string);
      reader.onerror = () => setError("Failed to process image");
      reader.readAsDataURL(file); // Convertir en Base64
    }
  };
  

  return (
    // <Layout>
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100 text-center">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100">
            <div className="text-center mb-4">
              <h2>Créer votre compte</h2>
              {/* <p>Create your account to get started.</p> */}
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{
                name: "",
                email: "",
                image: null,
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={async (values) => {
                try {
                  setError(null);
                  const base64Image = values.image
                    ? await convertToBase64(values.image)
                    : null;
                  await register(
                    values.name,
                    values.email,
                    values.password,
                    base64Image
                  );
                  navigate("/login");
                } catch (error) {
                  setError(
                    "Failed to register. Please check your details and try again."
                  );
                }
              }}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form>
                  <BootstrapForm.Group className="text-start mt-3">
                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                    <Field
                      name="name"
                      as={BootstrapForm.Control}
                      type="text"
                      placeholder="Enter name"
                      isInvalid={!!errors.name && touched.name}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.name}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="text-start mt-3">
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <Field
                      name="email"
                      as={BootstrapForm.Control}
                      type="email"
                      placeholder="Enter email"
                      isInvalid={!!errors.email && touched.email}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.email}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="text-start mt-3">
                    <BootstrapForm.Label>Image</BootstrapForm.Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) setFieldValue("image", file);
                      }}
                      className="form-control"
                    />
                    {errors.image && touched.image ? (
                      <div className="text-danger">{errors.image}</div>
                    ) : null}
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="text-start mt-3">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <Field
                      name="password"
                      as={BootstrapForm.Control}
                      type="password"
                      placeholder="Password"
                      isInvalid={!!errors.password && touched.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.password}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="text-start mt-3">
                    <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                    <Field
                      name="confirmPassword"
                      as={BootstrapForm.Control}
                      type="password"
                      placeholder="Confirm Password"
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <Button type="submit" className="w-100 mt-3 btn btn-danger">
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
    // </Layout>
  );
};

export default RegisterForm;
