import React from "react";
import { Container, Row, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import backgroundsatu from "../assets/backgroundsatu.jpg";
import backgrounddua from "../assets/backgrounddua.jpg";

function Home() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={4} className="text-center mt-5 my-auto">
          <h5>Praktikum Sistem Multimedia</h5>
          <h5>Ayuni Tia Sari</h5>
          <h5>1207050020</h5>
        </Col>
        <Col xs={12} md={8}>
          <Carousel
            style={{
              width: "100%",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
            slide={false}
          >
            <Carousel.Item>
              <h3>Konversi Gambar</h3>
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <img
                  className="d-block w-100"
                  src={backgroundsatu}
                  alt="First slide"
                  style={{ borderRadius: "0px" }}
                />
              </div>
              <Carousel.Caption>
                <p>
                  Konversi gambar mulai dari ukuran file , resolusi , dan tipe
                  gambar .
                </p>
                <Nav.Link
                  as={Link}
                  to="/image-convert"
                  className="custom-button btn-primary btn-lg"
                >
                  Konversi Gambar
                </Nav.Link>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <h3>Konversi Audio</h3>
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <img
                  className="d-block w-100"
                  src={backgrounddua}
                  alt="Third slide"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <Carousel.Caption>
                <p>Konversi audio mulai dari , type audio dan ukuran file.</p>
                <Nav.Link
                  as={Link}
                  to="/audio-convert"
                  className="custom-button btn-primary btn-lg"
                >
                  Konversi Audio
                </Nav.Link>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
