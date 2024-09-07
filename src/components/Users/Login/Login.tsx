import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../layout/Layout';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  return (
    <Layout>
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="text-center mb-4">
            <img src="path-to-your-logo" alt="Logo" className="mb-4" />
            <h2>Login</h2>
            <p>Welcome back. Please login to your account.</p>
          </div>
          <Formik
            initialValues={{ username: '', password: '', rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Email or Username</BootstrapForm.Label>
                  <Field
                    name="username"
                    as={BootstrapForm.Control}
                    type="text"
                    placeholder="Enter email or username"
                    isInvalid={!!errors.username && touched.username}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.username}
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

                <BootstrapForm.Group className="d-flex justify-content-between align-items-center">
                  <Field
                    name="rememberMe"
                    type="checkbox"
                    as={BootstrapForm.Check}
                    label="Remember Me"
                  />
                  <a href="#forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </BootstrapForm.Group>

                <Button variant="danger" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default LoginForm;
