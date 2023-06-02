import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function AudioConvert() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [format, setFormat] = useState("");
  const [convertedFile, setConvertedFile] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState(null);
  const [convertedFileDetails, setConvertedFileDetails] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State untuk status loading

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadedFileDetails(getFileDetails(event.target.files[0]));
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const getFileDetails = (file) => {
    if (file) {
      return {
        name: file.name,
        type: file.type,
        size: file.size,
      };
    }
    return null;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / 1048576).toFixed(2) + " MB";
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("audio", selectedFile);

    setLoading(true);

    axios
      .post("http://localhost:5000/upload", formData)
      .then((response) => {
        const { filename } = response.data;
        setUploadedFileUrl(`/uploads_convert_audio/${filename}`);
        Swal.fire("Success", "Berhail Upload Audio!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Gagal Upload Auido.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConvert = () => {
    const formData = new FormData();
    formData.append("audio", selectedFile);
    formData.append("format", format);

    setLoading(true);

    axios
      .post("http://localhost:5000/convert", formData)
      .then((response) => {
        const { convertedFileDetails } = response.data;
        const { name } = convertedFileDetails;
        setConvertedFileDetails(convertedFileDetails);
        setConvertedFileUrl(`/uploads_convert_audio/${name}`);
        setConvertedFile(convertedFileDetails.name);
        Swal.fire("Success", "Berhasil Konversi Audio", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Gagal Konversi Audio", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownload = (filename) => {
    axios
      .get(`http://localhost:5000/download/${filename}`, {
        responseType: "blob",
      })
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = filename;
        a.click();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Gagal Download Audio.", "error");
      });
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Konversi Audio</h1>

      <Row className="justify-content-center mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Upload File</Card.Title>

              <Form>
                <Form.Group>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                {uploadedFileUrl && (
                  <div className="mt-4">
                    <h3>Play Audio</h3>
                    <audio controls>
                      <source src={uploadedFileUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                {uploadedFileDetails && (
                  <div className="mt-4">
                    <h3>Detail</h3>
                    <p>Nama : {uploadedFileDetails.name}</p>
                    <p>Ukuran File : {formatSize(uploadedFileDetails.size)}</p>
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  style={{ marginTop: "10px" }}
                  className="custom-button"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Konversi Audio</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={format}
                    onChange={handleFormatChange}
                  >
                    <option value="">Pilih Format</option>
                    <option value="mp3">MP3</option>
                    <option value="wav">WAV</option>
                    {/* Add more format options here */}
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleConvert}
                  disabled={!selectedFile || !format}
                  style={{ marginTop: "10px", fontWeight:"bold" }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Converting...
                    </>
                  ) : (
                    "Konversi"
                  )}
                </Button>
              </Form>

              {convertedFileUrl && (
                <div className="mt-4">
                  <h3>Play Audio</h3>
                  <audio controls>
                    <source src={convertedFileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              {convertedFile && convertedFileDetails && (
                <div className="mt-4">
                  <h3>Detail Konversi</h3>
                  <p>Nama : {convertedFile}</p>
                  <p>Type : {convertedFileDetails.type}</p>
                  <p>Ukuran File : {formatSize(convertedFileDetails.size)}</p>
                  {/* <p>Konversi File: {convertedFile}</p> */}
                  <Button
                    variant="primary"
                    onClick={() => handleDownload(convertedFile)}
                  >
                    Download Audio
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AudioConvert;
