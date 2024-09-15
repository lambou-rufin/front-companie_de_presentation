// src/components/layout/Header.jsx
import { Link } from "react-router-dom";
import "./Header.css";
import React from "react";
import routes from "../../../router/routes";
// import { Row, Col } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <header>
      {/* <Row className="w-100 "> */}
      {/* <Col md={6} className="d-flex align-items-center">
            <div className="w-100 text-center">
              <img src="path-to-your-logo" alt="Logo" className="img-fluid" style={{ maxWidth: '100%' }} />
            </div>
          </Col> */}
      {/* <Col md={6} className="d-flex align-items-center"> */}
      <ul>
        <li>
          <h1>
            <i>Gestion de presentation</i>
          </h1>
        </li>
        {/* </Col> */}
        {/* <Col md={6} className="d-flex align-items-center"> */}
        <li>
          <div className="toggle_button">
            <span>Déconexion</span>
          </div>
          <div className="dropdown_menu">
            {/* <li> */}
              {/* <button> */}
              {/* <Link to={routes.PROFILE}>Profile</Link> */}
               {/* </button> */}
            {/* </li> */}
            <li>
              <Link to={routes.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={routes.LOGOUT}>Déconnexion</Link>
            </li>
          </div>
        </li>
      </ul>
      {/* </Col> */}
      {/* </Row> */}
    </header>
  );
};

export default Header;
