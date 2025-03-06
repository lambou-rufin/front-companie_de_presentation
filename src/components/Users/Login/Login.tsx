import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/user";
import { AuthForm } from "utils/inteface/interface";
import routes from "router/routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import des styles pour react-toastify
import "./Login.css"; // Importez le fichier CSS

const logo = require("../../../assets/img/logo.jpg"); // Importez votre logo

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: AuthForm) => {
    setLoading(true); // Début du chargement
    try {
      const { token, user } = await login(values.email, values.password);

      // Stocker le token et l'utilisateur dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Afficher une notification de succès
      toast.success("Connexion réussie ! Bienvenue 🎉");

      // Naviguer vers une autre page
      navigate("/personne");
    } catch (error) {
      // Afficher une notification d'erreur
      toast.error("Erreur lors de la connexion. Vérifiez vos informations.");
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <ToastContainer />
      <div className="container p-2 p-sm-4">
        <Card className="overflow-hidden rounded-4 card-auth card-auth-mh">
          <Row className="g-0 flex-lg-row-reverse">
            {/* Partie formulaire */}
            <Col
              lg="5"
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Body className="h-100 d-flex flex-column justify-content-center">
                <div className="nk-block-head text-center">
                  <h3 className="nk-block-title mb-1">Se connecter</h3>
                  {/* <p className="small">
                    Bienvenue ! Connectez-vous pour continuer.
                  </p> */}
                </div>

                <Formik
                  initialValues={{ email: "", password: "", remember: false }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Row className="gy-3">
                        <Col xs="12">
                          <BootstrapForm.Group className="form-group text-start mt-3">
                            <BootstrapForm.Label>Email</BootstrapForm.Label>
                            <Field
                              name="email"
                              type="email"
                              className={`form-control ${
                                errors.email && touched.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </BootstrapForm.Group>
                        </Col>

                        <Col xs="12">
                          <BootstrapForm.Group className="form-group text-start mt-3">
                            <BootstrapForm.Label>
                              Mot de passe
                            </BootstrapForm.Label>
                            <Field
                              name="password"
                              type="password"
                              className={`form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </BootstrapForm.Group>
                        </Col>

                        <Col xs="12">
                          <div className="d-flex flex-wrap justify-content-between">
                            <Field
                              as={BootstrapForm.Check}
                              type="checkbox"
                              id="remember"
                              label="Se souvenir de moi"
                              name="remember"
                              required
                            />
                            <Link to={routes.FORGOTPASSWORD}>
                              Mot de passe oublié
                            </Link>
                          </div>
                        </Col>

                        <Col xs="12">
                          <Button
                            variant="danger"
                            type="submit"
                            className="w-100 mt-3"
                            disabled={loading}
                          >
                            {loading ? "Chargement..." : "Connexion"}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>

                <div className="text-start mt-4">
                  <p className="small">
                    Pas encore de compte ?{" "}
                    <Link to={routes.REGISTER}>Inscrivez-vous ici</Link>
                  </p>
                </div>
              </Card.Body>
            </Col>

            {/* Partie image */}
            <Col
              lg="7"
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="brand-logo text-center">
                  <img src={logo} alt="Logo" className="image-full" />
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
};

export default LoginForm;
