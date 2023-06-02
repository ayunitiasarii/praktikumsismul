import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function AudioMerge() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [mergedFile, setMergedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
    Swal.fire("Success!", "Berhasil Upload File Pertama", "success");
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
    Swal.fire("Success!", "Berhasil Upload File Kedua / Backsound", "success");
  };

  const handleMerge = () => {
    mergeAudio(false);
  };

  const handleMergeWithBacksound = () => {
    mergeAudio(true);
  };

  const mergeAudio = (withBacksound) => {
    const formData = new FormData();
    formData.append("audioFiles", file1);
    formData.append("audioFiles", file2);

    setIsLoading(true);

    const mergeEndpoint = withBacksound ? "/mergewithbacksound" : "/merge";

    fetch(mergeEndpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const mergedAudioFile = new File([blob], "merged-audio.mp3", {
          type: "audio/mpeg",
        });
        setMergedFile(mergedAudioFile);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "merged-audio.mp3");
        link.click();

        setIsLoading(false);

        Swal.fire({
          icon: "success",
          title: "Penggabungan Berhasil",
          text: "Download Audio Berhasil.",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);

        Swal.fire({
          icon: "error",
          title: "Penggabungan gagal",
          text: "Penggabungan Audio Gagal.",
        });
      });
  };

  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes === 0) {
      return "0 KB";
    }
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
    const formattedSize = parseFloat(
      (sizeInBytes / Math.pow(1024, i)).toFixed(2)
    );
    return `${formattedSize} ${sizes[i]}`;
  };

  const renderFileInfo = (file) => {
    if (file) {
      return (
        <div className="mt-4">
          <p>Nama : {file.name}</p>
          <p>Ukuran : {formatFileSize(file.size)}</p>
          <p>Tipe : {file.type}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Penggabungan Audio</h1>
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <label htmlFor="file1" className="form-label">
                  Upload File 1 :
                </label>
                <input
                  type="file"
                  id="file1"
                  className="form-control"
                  onChange={handleFile1Change}
                />
                {renderFileInfo(file1)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              {" "}
              <div className="mb-3">
                <label htmlFor="file2" className="form-label">
                  Upload File 2 :
                </label>
                <input
                  type="file"
                  id="file2"
                  className="form-control"
                  onChange={handleFile2Change}
                />
                {renderFileInfo(file2)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Row className="justify-content-md-center mt-4">
          <Col md="auto">
            <Card>
              <Card.Body>
                {" "}
                <Button
                  variant="primary"
                  onClick={handleMerge}
                  disabled={isLoading}
                  className="me-2"
                >
                  {isLoading ? "Loading..." : "Gabunggkan Audio"}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleMergeWithBacksound}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Tambah Backsound"}
                </Button>
                {mergedFile && (
                  <div className="mt-4">
                    <h4>Penggabungan Audio :</h4>
                    {renderFileInfo(mergedFile)}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default AudioMerge;
