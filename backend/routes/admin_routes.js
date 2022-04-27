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

export default router;