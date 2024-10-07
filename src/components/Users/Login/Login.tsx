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
import logo from '../../../assets/img/logo.png';

// Schéma de validation avec Yup pour les champs email et mot de passe
const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le spinner de chargement
  const [alertVisible, setAlertVisible] = useState(false); // État pour afficher l'alerte
  const [alertMessage, setAlertMessage] = useState(''); // Message d'alerte
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success'); // Type d'alerte
  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (values: AuthForm) => {
    try {
      // Déclenche le spinner pendant le traitement du login
      // setLoading(true);
      const { token, user } = await login(values.email, values.password);
      // Stocke le token et les informations utilisateur dans le localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Arrête le spinner une fois que le login est réussi
      // setLoading(false);

      // Redirige immédiatement après la réussite de la connexion
      navigate('/dashboard'); // Redirection vers le tableau de bord
    } catch (error) {
      setAlertMessage('Une erreur s\'est produite lors de la connexion.');
      setAlertType('error');
      setAlertVisible(true); // Affiche l'alerte en cas d'erreur
      // setLoading(false); 
      // Arrête le spinner en cas d'erreur
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100 text-center">
              {/* Utilisation de l'image importée */}
              <img src="/assets/img/logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
              </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100">
            <div className="text-center mb-4">
              <h2>Se connecter</h2>
              {/* <p>Welcome back. Please login to your account.</p> */}
            </div>
            {/* Affiche le spinner pendant le chargement */}
            {loading && <Spinner loading={loading} />} 
            
            <Formik
              initialValues={{ email: '', password: '', remember: false }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Champ pour l'email */}
                  <BootstrapForm.Group controlId="formEmail">
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && touched.email ? (
                      <div className="invalid-feedback">{errors.email}</div>
                    ) : null}
                  </BootstrapForm.Group>

                  {/* Champ pour le mot de passe */}
                  <BootstrapForm.Group controlId="formPassword">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    />
                    {errors.password && touched.password ? (
                      <div className="invalid-feedback">{errors.password}</div>
                    ) : null}
                  </BootstrapForm.Group>
                  <p><Link to={routes.FORGOTPASSWORD}>Forgot Password?</Link></p>
                  <Button variant="danger" type="submit" className="w-100 mt-3" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'} {/* Change le texte du bouton pendant le chargement */}
                  </Button>
                  <div className="text-center mt-3">
                    <p>Don't have an account? <Link to={routes.REGISTER}>Register here</Link></p>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Affiche l'alerte si nécessaire */}
            {alertVisible && (
              <SweetAlert
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertVisible(false)} // Ferme l'alerte
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
