const express = require("express");
const app = express();
const cors = require("cors");
const convertAudio = require("./convertaudio");
const convertImage = require("./convertimage");
const mergeAudio = require("./mergeaudio");

app.use(express.json());
app.use(cors());

app.use("/", convertAudio);
app.use("/", convertImage);
app.use("/", mergeAudio);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port", port));
