const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const logger = require("../../logging/logger");
const db = require("../database/db_functions");


// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/cookbook/");
  }, 
  filename: (req, file, cb) => {
    let recipeName = req.body["title"].replace(/\s/g, '');
    let filename = recipeName + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({storage: storage});

router.get("/", async (req, res) => {
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/cookbook${req.url}`);
  const results = await db.getAllRecepies();
  if (results === 500) {
    return res.status(500).send("Unsuccess")
  }
  res.status(200).json(results);
});

router.get("/:recipeName", async (req, res) => {
  logger.log("info", `HTTP ${res.statusCode} ${req.method} /api/cookbook${req.url}`);

  const recipeName = req.params["recipeName"];
  if (!recipeName) return res.status(404).send("bad URI");
  const result = await db.getRecepie(recipeName);
  if (result === 500) return res.status(500).send("Something went wrong.");
  res.status(200).json(result);
});

module.exports = router;
