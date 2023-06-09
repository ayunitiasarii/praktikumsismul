import React from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AudioConvert from "./components/AudioConvert";
import ImageConvert from "./components/ImageConvert";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audio-convert" element={<AudioConvert />} />
          <Route path="/image-convert" element={<ImageConvert />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
