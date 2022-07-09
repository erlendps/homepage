const express = require("express");
const router = express.Router();

const logger = require("../../logging/logger");
const db = require("../database/db_functions");


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

module.exports = router;
