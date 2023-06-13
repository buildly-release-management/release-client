import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

const MainNavbar = (props: any) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="custom-navbar"
      >
        <Container>
          <a className="navbar-brand" href="#home">
            {/*<img src="/src/assets/img/logo.png" />*/}
          </a>
          {/*<Navbar.Brand href="#home">*/}
          {/*  <img*/}
          {/*    src="./../../assets/img/logo.png"*/}
          {/*    width="180"*/}
          {/*    className="d-inline-block align-top"*/}
          {/*    alt="Buildly insights"*/}
          {/*  />*/}
          {/*</Navbar.Brand>*/}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#releases">Releases</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Logged in User
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;
