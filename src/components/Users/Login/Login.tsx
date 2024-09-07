// import React, { useState } from 'react';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
// import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import routes from '../../../router/routes';
// import { login } from '../../../services/user'; // Assurez-vous que ce chemin est correct

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().required('Email est requis').email('Adresse email invalide'),
//   password: Yup.string().required('Mot de passe est requis'),
// });

// const LoginForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (values: { email: string; password: string }) => {
//     try {
//       setError(null);
//       const response = await login(values.email, values.password);
//       localStorage.setItem('token', response.token); // Stockage du token dans le stockage local
//       navigate('/dashboard'); // Redirection après une connexion réussie
//     } catch (error) {
//       setError('Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.'); // Gestion de l'échec de la connexion
//     }
//   };

//   return (
//     <Container className="vh-100 d-flex justify-content-center align-items-center">
//       <Row className="w-100">
//         <Col md={6} className="d-flex align-items-center">
//           <div className="w-100 text-center">
//             <img src="path-to-your-logo" alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
//           </div>
//         </Col>
//         <Col md={6} className="d-flex align-items-center">
//           <div className="w-100">
//             <div className="text-center mb-4">
//               <h2>Connexion</h2>
//               <p>Bienvenue de nouveau. Veuillez vous connecter à votre compte.</p>
//             </div>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <Formik
//               initialValues={{ email: '', password: '' }}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form>
//                   <BootstrapForm.Group>
//                     <BootstrapForm.Label>Email</BootstrapForm.Label>
//                     <Field
//                       name="email"
//                       as={BootstrapForm.Control}
//                       type="email"
//                       placeholder="Entrez votre email"
//                       isInvalid={!!errors.email && touched.email}
//                     />
//                     <BootstrapForm.Control.Feedback type="invalid">
//                       {errors.email}
//                     </BootstrapForm.Control.Feedback>
//                   </BootstrapForm.Group>

//                   <BootstrapForm.Group>
//                     <BootstrapForm.Label>Mot de passe</BootstrapForm.Label>
//                     <Field
//                       name="password"
//                       as={BootstrapForm.Control}
//                       type="password"
//                       placeholder="Mot de passe"
//                       isInvalid={!!errors.password && touched.password}
//                     />
//                     <BootstrapForm.Control.Feedback type="invalid">
//                       {errors.password}
//                     </BootstrapForm.Control.Feedback>
//                   </BootstrapForm.Group>

//                   <BootstrapForm.Group className="d-flex justify-content-between align-items-center">
//                     <Field
//                       name="rememberMe"
//                       type="checkbox"
//                       as={BootstrapForm.Check}
//                       label="Se souvenir de moi"
//                     />
//                     <a href="#forgot-password" className="text-decoration-none">
//                       Mot de passe oublié ?
//                     </a>
//                   </BootstrapForm.Group>

//                   <Button variant="danger" type="submit" className="w-100 mt-3">
//                     Connexion
//                   </Button>
//                   <div className="text-center mt-3">
//                     <p>Vous n'avez pas de compte ? <Link to={routes.REGISTER}>Inscrivez-vous ici</Link></p>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginForm;

// src/components/Users/Login/Login.tsx

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import { login } from '../../../services/user';  // Assurez-vous du chemin d'import

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError(null);
      await login(values.email, values.password); // Connexion réussie si aucune erreur n'est lancée
      navigate('/dashboard'); // Redirection vers le tableau de bord après une connexion réussie
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
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
              <h2>Login</h2>
              <p>Welcome back. Please login to your account.</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{ email: '', password: '' }}
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
  );
};

export default LoginForm;
