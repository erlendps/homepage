const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const logger = require("../../logging/logger");
const db = require("../database/db_functions");


// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/projects/");
  }, 
  filename: (req, file, cb) => {
    let title = req.body["title"].replace(/\s/g, '');
    let filename = title + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({storage: storage});


// returns all projects
router.get("/", async (req, res) => {
  const result = await db.getAllProjects();
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/projects${req.url}`);
  // check if error
  if (result === 500) {
    return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>")
  }
  res.status(200).json(result);
});

router.get("/newproject", async (req, res) => {
  const result = await db.getAllTechs();
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/projects${req.url}`);

  // check if error
  if (result === 500) {
    return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>")
  }
  res.status(200).json(result);
});

router.post("/newproject", upload.single("project_image"), async (req, res) => {
  let body = req.body();
});


module.exports = router;
