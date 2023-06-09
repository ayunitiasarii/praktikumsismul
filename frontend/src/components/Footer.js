import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="mt-5">
      <Container>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Ayunitsr <br></br>Praktikum Sistem
          Multimedia.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
