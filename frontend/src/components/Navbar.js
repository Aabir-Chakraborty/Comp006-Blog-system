import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as RBNavbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const navbarRef = useRef();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch("/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      if (onLogout) onLogout();
      navigate("/auth/login");
    } catch {
      navigate("/auth/login");
    }
  };

  // Collapse navbar after click (for mobile/tablet)
  const handleNavClick = () => {
    if (navbarRef.current && window.innerWidth < 992) {
      navbarRef.current.classList.remove("show");
    }
  };

  return (
    <RBNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <RBNavbar.Brand as={Link} to="/">Blog System</RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="navbarNav" />
        <RBNavbar.Collapse id="navbarNav" ref={navbarRef}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/posts" onClick={handleNavClick}>All Posts</Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/posts/create" onClick={handleNavClick}>Create Post</Nav.Link>
                {user.isAdmin && (
                  <NavDropdown title="Admin" id="admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/users" onClick={handleNavClick}>Users</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/posts" onClick={handleNavClick}>All Posts</NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link disabled>Hello, {user.username}!</Nav.Link>
                <Nav.Link href="/auth/logout" onClick={(e) => { handleLogout(e); handleNavClick(); }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/auth/login" onClick={handleNavClick}>Login</Nav.Link>
                <Nav.Link as={Link} to="/auth/register" onClick={handleNavClick}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;