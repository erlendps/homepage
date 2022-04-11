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

module.exports = router;
