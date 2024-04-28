// src/components/layout/Navbar.jsx
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./navbar.module.css"; // Import your styles

const CustomNavbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    navigate(0); // Refresh the current page to update the language
  };

  return (
    <Navbar className={styles.navbar} bg="light" expand="lg" sticky="top">
      <Navbar.Brand className={styles['navbar-brand']} as={Link} to="/">
        {t("navbar.brand")}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`ml-auto ${styles['navbar-nav']}`}>
        <Nav.Link as={Link} to="/products">
            {t("navbar.products")}
          </Nav.Link>
          <Nav.Link as={Link} to="/suppliers">
            {t("navbar.suppliers")}
          </Nav.Link>
          <Nav.Link as={Link} to="/customers">
            {t("navbar.customers")}
          </Nav.Link>
          <Nav.Link as={Link} to="/orders">
            {t("navbar.orders")}
          </Nav.Link>
          <Nav.Link as={Link} to="/incoming-goods">{t("navbar.incoming_goods")}</Nav.Link> {/* Added line */}

          <Nav.Link as={Link} to="/delivery-notes">
            {t("navbar.delivery_notes")}
          </Nav.Link>
          <NavDropdown title={t("navbar.language")} id="language-dropdown">
            <NavDropdown.Item onClick={() => changeLanguage("en")}>
              {t("navbar.english")}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage("hu")}>
              {t("navbar.hungarian")}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
