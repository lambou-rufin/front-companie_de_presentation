// import React from 'react';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
// import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
// import Layout from '../../layout/Layout';
// import routes from '../../../router/routes';
// import { Link } from 'react-router-dom';

// const LoginSchema = Yup.object().shape({
//   username: Yup.string().required('Username is required'),
//   password: Yup.string().required('Password is required'),
// });

// const LoginForm: React.FC = () => {
//   return (
//     // <Layout>
//       <Container className="vh-100 d-flex justify-content-center align-items-center">
//         <Row className="w-100">
//           <Col md={6} className="d-flex align-items-center">
//             <div className="w-100 text-center">
//               <img src="path-to-your-logo" alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
//             </div>
//           </Col>
//           <Col md={6} className="d-flex align-items-center">
//             <div className="w-100">
//               <div className="text-center mb-4">
//                 <h2>Login</h2>
//                 <p>Welcome back. Please login to your account.</p>
//               </div>
//               <Formik
//                 initialValues={{ username: '', password: '', rememberMe: false }}
//                 validationSchema={LoginSchema}
//                 onSubmit={values => {
//                   console.log(values);
//                 }}
//               >
//                 {({ errors, touched }) => (
//                   <Form>
//                     <BootstrapForm.Group>
//                       <BootstrapForm.Label>Email or Username</BootstrapForm.Label>
//                       <Field
//                         name="username"
//                         as={BootstrapForm.Control}
//                         type="text"
//                         placeholder="Enter email or username"
//                         isInvalid={!!errors.username && touched.username}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         {errors.username}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     <BootstrapForm.Group>
//                       <BootstrapForm.Label>Password</BootstrapForm.Label>
//                       <Field
//                         name="password"
//                         as={BootstrapForm.Control}
//                         type="password"
//                         placeholder="Password"
//                         isInvalid={!!errors.password && touched.password}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         {errors.password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     <BootstrapForm.Group className="d-flex justify-content-between align-items-center">
//                       <Field
//                         name="rememberMe"
//                         type="checkbox"
//                         as={BootstrapForm.Check}
//                         label="Remember Me"
//                       />
//                       <a href="#forgot-password" className="text-decoration-none">
//                         Forgot Password?
//                       </a>
//                     </BootstrapForm.Group>

//                     <Button variant="danger" type="submit" className="w-100 mt-3">
//                       Login
//                     </Button>
//                     <div className="text-center mt-3">
//                       <p>Don't have an account? <Link to={routes.REGISTER}>Register here</Link></p>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     // {/* </Layout> */}
//   );
// };

// export default LoginForm;

// src/components/Users/Login.jsx
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../layout/Layout';
import routes from '../../../router/routes';
import { Link } from 'react-router-dom';
import { login } from '../../../services/user';  // Assurez-vous du chemin d'import


const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError(null); // Réinitialiser les erreurs
      await login(values.email, values.password); // Appel à la fonction de connexion
      // Redirection ou gestion après une connexion réussie
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
    }
  };

  return (
    // <Layout>
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
                <h2>Login</h2>
                <p>Welcome back. Please login to your account.</p>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <Formik
                initialValues={{ email: '', password: '', rememberMe: false }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
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
    // </Layout>
  );
};

export default LoginForm;
