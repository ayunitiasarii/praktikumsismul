import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const renderBackButton = () => {
    if (location.pathname !== "/") {
      return (
        <Button as={Link} to="/" variant="light" className="mr-auto">
          Back
        </Button>
      );
    }
    return null;
  };

  return (
    <Navbar className="justify-content-center" bg="dark" variant="dark">
      {renderBackButton()}
      <Navbar.Brand href="/">Ayunitsr</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
