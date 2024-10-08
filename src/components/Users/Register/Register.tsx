import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import Layout from '../../main/layout/Layout'; // Décommentez si vous utilisez Layout
import { register } from '../../../services/user'; // Assurez-vous du chemin d'import
import './Register.css';
const logo = require("../../../assets/img/logo.jpg")


const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  image: Yup.mixed()
  .test('fileSize', 'Le fichier est trop volumineux', (value: any | undefined) => {
    if (!value) return true;
    return value.size <= 2896 * 2896; // 1 Mo maximum
  })
  .test('fileType', 'Format de fichier non pris en charge', (value: any | undefined) => {
    if (!value) return true;
    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
  }),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; email: string; image: string, password: string; confirmPassword: string }) => {
    try {
      setError(null); // Réinitialiser les erreurs
      await register(values.username, values.email, values.password); // Appel à la fonction d'inscription
      // Redirection ou gestion après une inscription réussie
         navigate('/login'); // Redirection après une connexion réussie

      // Par exemple : redirection vers la page de connexion ou affichage d'un message de succès
    } catch (error) {
      setError('Failed to register. Please check your details and try again.');
    }
  };

  return (
    // <Layout>
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={6} className="d-flex align-items-center">
            <div className="w-100 text-center">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
            </div>
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div className="w-100">
              <div className="text-center mb-4">
                <h2>Créer votre compte</h2>
                <p>Create your account to get started.</p>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  image:  '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Username</BootstrapForm.Label>
                      <Field
                        name="username"
                        as={BootstrapForm.Control}
                        type="text"
                        placeholder="Enter username"
                        isInvalid={!!errors.username && touched.username}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.username}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group>
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

                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Image</BootstrapForm.Label>
                      <Field
                        name="image"
                        as={BootstrapForm.Control}
                        type="file"
                        placeholder="Enter image"
                        isInvalid={!!errors.username && touched.username}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.image}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group>
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

                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                      <Field
                        name="confirmPassword"
                        as={BootstrapForm.Control}
                        type="password"
                        placeholder="Confirm Password"
                        isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <Button variant="danger" type="submit" className="w-100 mt-3 btn btn-danger">
                      Register
                    </Button>
                    <div className="text-center mt-3 d-flex justify-content-center">
                      <p>Already have an account? <Link to={routes.LOGIN}>Login here</Link></p>
                    </div>
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