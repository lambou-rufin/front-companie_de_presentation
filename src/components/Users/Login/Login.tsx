import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/user'; // Adjust the import path
import Spinner from 'shared/components/Spinner/Spinner';
import SweetAlert from 'shared/components/SweetAlert/SweetAlert';
import { AuthForm } from 'shared/inteface/interface';
import routes from 'router/routes';

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
      setLoading(true); // Start loading
  
      const { token, user } = await login(values.email, values.password);
      // Store the token and user information in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Rediriger après un délai
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard'); // Redirect to dashboard after spinner timeout
      }, 1000); // 5 seconds
    } catch (error) {
      setAlertMessage('Erreur lors de la connexion.');
      setAlertType('error');
      setAlertVisible(true); // Show SweetAlert
      setLoading(false); // Stop loading on error
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
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            {loading && <Spinner loading={loading} />} {/* Show spinner when loading */}
            <Formik
              initialValues={{ email: '', password: '', remember: false }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Input Field for Email */}
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

                  {/* Input Field for Password */}
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
                    {loading ? 'Loading...' : 'Login'} {/* Change button text during loading */}
                  </Button>
                  <div className="text-center mt-3">
                    <p>Don't have an account? <Link to={routes.REGISTER}>Register here</Link></p>
                  </div>
                </Form>
              )}
            </Formik>
            {alertVisible && (
              <SweetAlert
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertVisible(false)} // Close the alert
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
