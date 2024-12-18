import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/user';
import Spinner from 'shared/components/Spinner/Spinner';
import SweetAlert from 'shared/components/SweetAlert/SweetAlert';
import { AuthForm } from 'utils/inteface/interface';
import routes from 'router/routes';
import './Login.css'; // Importez le fichier CSS
const logo = require('../../../assets/img/logo.jpg'); // Importez votre logo

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const navigate = useNavigate();

  const handleSubmit = async (values: AuthForm) => {
    try {
      const { token, user } = await login(values.email, values.password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/personne');
    } catch (error) {
      setAlertMessage("Une erreur s'est produite lors de la connexion.");
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  return (
    <Container fluid className="login-container vh-100">
      <Row className="h-100">
        {/* Image côté gauche */}
        <Col xs={12} md={6} className="image-container">
          <img src={logo} alt="Logo" className="image-full" />
        </Col>

        {/* Formulaire côté droit */}
        <Col xs={12} md={6} className="form-container">
          <div className="form-content">
            <div className="text-center mb-4">
              <h2>Se connecter</h2>
            </div>
            {loading && <Spinner loading={loading} />}
            <Formik
              initialValues={{ email: '', password: '', remember: false }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <BootstrapForm.Group controlId="formEmail" className="text-start mt-3">
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId="formPassword" className="text-start mt-3">
                    <BootstrapForm.Label>Mot de passe</BootstrapForm.Label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </BootstrapForm.Group>

                  <p>
                    <Link to={routes.FORGOTPASSWORD}>Mot de passe oublié ?</Link>
                  </p>

                  <Button variant="danger" type="submit" className="w-100 mt-3" disabled={loading}>
                    {loading ? 'Chargement...' : 'Connexion'}
                  </Button>
                  <div className="text-center mt-3">
                    <p>
                      Pas encore de compte ?{' '}
                      <Link to={routes.REGISTER}>Inscrivez-vous ici</Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>

            {alertVisible && (
              <SweetAlert
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertVisible(false)}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
