import { observer } from "mobx-react";
import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthStore from "../Store/AuthStore";

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Posts",
    path: "/post",
  },
  {
    title: "Favorites",
    path: "/favorite",
  },
  {
    title: "About us",
    path: "/about",
  },
];

const NavigationBar = observer(() => {
  return (
    <Navbar bg="primary" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item, i) => (
              <Link key={i} className="nav-link" to={item.path}>
                {item.title}
              </Link>
            ))}
          </Nav>
          {!AuthStore.isAuthenticated && (
            <Nav>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </Nav>
          )}
          {AuthStore.isAuthenticated && (
            <Nav>
              <Nav.Link className="nav-link active">
                {AuthStore.user.username}
              </Nav.Link>
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavigationBar;
