 // Assurez-vous du chemin d'import
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import { IForgotPassword } from '../../../shared/inteface/interface';
import { forgotPass } from '../../../services/user';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
});

const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: IForgotPassword) => {
    try {
      setError(null);
      await forgotPass(values.email); // Connexion réussie si aucune erreur n'est lancée
      navigate('/login'); // Redirection vers le tableau de bord après une connexion réussie
    } catch (error) {
      setError('Failed to reset password. Please check your email and try again.');
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100 text-center">
            <img src="path-to-your-logo" alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100">
            <div className="text-center mb-4">
              <h2>Forgot password</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
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
                  <div className="text-end">
                    <p><Link to={routes.LOGIN}>Login here</Link></p>
                  </div>
                  <Button variant="danger" type="submit" className="w-100 mt-3 btn btn-danger">
                    Envoyer
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;
