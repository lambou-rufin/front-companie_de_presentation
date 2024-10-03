import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import { login } from '../../../services/user';  // Assurez-vous du chemin d'import
import { AuthForm } from '../../../shared/inteface/interface';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: AuthForm) => {
    try {
      setError(null);
      const { token, user } = await login(values.email, values.password); // Connexion réussie si aucune erreur n'est lancée
       // Stocker le token et les informations de l'utilisateur dans le local storage
       localStorage.setItem('token', token);
       localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard'); // Redirection vers le tableau de bord après une connexion réussie
    } catch (error) {
      setError('Connexion error, please try again.');
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100 text-center">
            <img src="/assets/img/lery.jpg" alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100">
            <div className="text-center mb-4">
              <h2>Se connecter</h2>
              <p>Welcome back. Please login to your account.</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{ email: '', password: '', remember: false }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <Field
                      name="email"
                      as={BootstrapForm.Control}
                      type="email"
                      placeholder="Entrer votre email"
                      isInvalid={!!errors.email && touched.email}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.email}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group>
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <Field
                      name="password"
                      as={BootstrapForm.Control}
                      type="password"
                      placeholder="Entrer votre mot de passe"
                      isInvalid={!!errors.password && touched.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.password}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="d-flex justify-content-between align-items-center mt-3">
                  <Field
                    as={BootstrapForm.Check}
                     className="form-check-sm"
                       type="checkbox"
                       id="remember"
                      label="Remember me"
                     name="remember"
                                                            />
                    <p><Link to={routes.FORGOTPASSWORD}>Forgot Password?</Link></p>
                  </BootstrapForm.Group>
                  <Button variant="danger" type="submit" className="w-100 mt-3 btn btn-danger">
                    Login
                  </Button>
                  <div className="text-center mt-3">
                    <p>Don't have an account? <Link to={routes.REGISTER}>Register here</Link></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
