const express = require("express");
const path = require("path");
const multer = require("multer");

const PORT = process.env.PORT || 3000 // https://stackoverflow.com/a/21873049

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/", upload, (req, res, _next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.send("Multer Error", err);
    } else if (err) res.send("Unknown Error", err);
  });
  res.status(200).json(req.file);
});

app.use("/images", express.static("./images")); // https://stackoverflow.com/a/44561891

app.listen(PORT);
