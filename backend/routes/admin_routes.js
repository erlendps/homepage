const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const logger = require("../../logging/logger");
const db = require("../database/db_functions");

const isAdmin = async (req, res, next) => {
  let isAdmin = await db.checkIfAdmin(req.username);
  if (isAdmin) {
    next();
  } else {
    res.send("redirect");
  }
}

// multer config
const cookbook_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/cookbook/");
  }, 
  filename: (req, file, cb) => {
    let recipeName = req.body["title"].replace(/\s/g, '');
    let filename = recipeName + path.extname(file.originalname);
    cb(null, filename);
  }
});

const cookbook_upload = multer({storage: cookbook_storage});

// multer config
const project_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/projects/");
  }, 
  filename: (req, file, cb) => {
    let title = req.body["title"].replace(/\s/g, '');
    let filename = title + path.extname(file.originalname);
    cb(null, filename);
  }
});

const project_upload = multer({storage: project_storage});


router.get("/newproject", async (req, res) => {
  const result = await db.getAllTechs();
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/projects${req.url}`);

  // check if error
  if (result === 500) {
    return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>")
  }
  res.status(200).json(result);
});

router.post("/newproject", project_upload.single("project_image"), async (req, res) => {
  let body = req.body();
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/projects${req.url}`);
  if (!req.file) {
    return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>")
  }
  let img_src;
  if (process.env.NODE_ENV === "dev") {
    img_src = "http://localhost:3001/static/projects/" + req.file.filename;
  } else {
    img_src = "https://pauska.no/static/projects/" + req.file.filename;
  }
  const result = await db.newProject(body, img_src);
  if (result === 201) {
    return res.status(201).send("Sucessfully created project");
  }
  return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>")
});

router.get("/newtech", async (req, res) => {
  const result = await db.getAllTechs();
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/projects${req.url}`);

  if (result === 500) {
    return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>")
  }
  res.status(200).json(result);
});

router.post("/newtech", async (req, res) => {
  const body = req.body();
  const result = await db.newTech(body);
  if (result === 201) {
    return res.status(201).send("Technology created successfully")
  }
  return res.status(500).send("<h1>500 Internal Server Error</h1><p>Something is wrong on our end, sorry!</p>");
})

module.exports = router;