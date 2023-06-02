import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import Swal from "sweetalert2";

function ImageConvert() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [imageDetails, setImageDetails] = useState({
    original: null,
    processed: null,
  });
  const [compressionDetails, setCompressionDetails] = useState({
    originalSize: null,
    processedSize: null,
    compressionRatio: null,
  });
  const [uploadedFileName, setUploadedFileName] = useState("");

  function formatFileSize(size) {
    if (size < 1024) {
      return size + " B";
    } else if (size < 1024 * 1024) {
      const kbSize = (size / 1024).toFixed(2);
      return kbSize + " KB";
    } else {
      const mbSize = (size / (1024 * 1024)).toFixed(2);
      return mbSize + " MB";
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadedFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));
    Swal.fire("Success!", "File berhasil diupload.", "success");

    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.onload = function() {
        const width = this.width;
        const height = this.height;

        setImageDetails((prevDetails) => ({
          ...prevDetails,
          original: {
            fileSize: formatFileSize(file.size),
            width,
            height,
            type: file.type,
          },
        }));
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      axios
        .post("/api/upload", formData)
        .then((response) => {
          console.log("Image uploaded successfully");
          console.log("Processed image URL:", response.data.processedImageUrl);
          setProcessedImage(response.data.processedImageUrl);
          setImageDetails((prevDetails) => ({
            ...prevDetails,
            processed: {
              fileSize: formatFileSize(
                response.data.imageDetails.processedImageSize
              ),
              width: response.data.imageDetails.processedImageWidth,
              height: response.data.imageDetails.processedImageHeight,
              type: "image/jpeg",
            },
          }));
          Swal.fire("Success!", "Gambar berhasil dikonversi.", "success");

          const originalSize = selectedFile.size;
          const processedSize = response.data.imageDetails.processedImageSize;
          const compressionRatio =
            ((originalSize - processedSize) / originalSize) * 100;
          setCompressionDetails({
            originalSize: formatFileSize(originalSize),
            processedSize: formatFileSize(processedSize),
            compressionRatio: compressionRatio.toFixed(2),
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const filename = processedImage.split("/").pop();
      axios
        .get(`/api/download/${filename}`, { responseType: "blob" })
        .then((response) => {
          const downloadUrl = window.URL.createObjectURL(
            new Blob([response.data])
          );
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", `processing.jpeg`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
        });
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Konversi Gambar</h2>
      <Row className="justify-content-center mt-5">
        <Col xs={6} className="text-center">
          <Form>
            <Form.Group>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleUpload}
              style={{ marginTop: "10px" }}
              className="custom-button"
            >
              Konversi
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Gambar Asli</Card.Title>
              {previewImage && (
                <Card.Img variant="top" src={previewImage} alt="Original" />
              )}
              {imageDetails.original && (
                <div className="mt-4">
                  <ul>
                    <li>Ukuran File : {imageDetails.original.fileSize}</li>
                    <li>
                      Resolusi : {imageDetails.original.width} x{" "}
                      {imageDetails.original.height}
                    </li>
                    <li>Format : {imageDetails.original.type}</li>
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Hasil Konversi</Card.Title>
              {processedImage && (
                <Card.Img variant="top" src={processedImage} alt="Processed" />
              )}
              {imageDetails.processed && (
                <div className="mt-4">
                  <ul>
                    <li>Ukuran File : {imageDetails.processed.fileSize}</li>
                    <li>
                      Resolusi : {imageDetails.processed.width} x{" "}
                      {imageDetails.processed.height}
                    </li>
                    <li>Format : {imageDetails.processed.type}</li>
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={6}>
          {imageDetails.processed && (
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Detail</Card.Title>
                <p>Gambar Asli : {compressionDetails.originalSize}</p>
                <p>Hasil Kompresi : {compressionDetails.processedSize}</p>
                <p>Rasio Kompresi : {compressionDetails.compressionRatio}%</p>
                <Button onClick={handleDownload} className="custom-button">
                  Download Gambar
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ImageConvert;
