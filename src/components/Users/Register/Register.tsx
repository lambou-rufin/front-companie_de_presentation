import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../layout/Layout';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterForm: React.FC = () => {
  return (
    <Layout>
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="text-center mb-4">
            <img src="path-to-your-logo" alt="Logo" className="mb-4" />
            <h2>Register</h2>
            <p>Create your account to get started.</p>
          </div>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
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

                <Button variant="danger" type="submit" className="w-100 mt-3">
                  Register
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

export default RegisterForm;
