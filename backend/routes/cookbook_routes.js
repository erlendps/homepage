const express = require("express");
const router = express.Router();

const logger = require("../logging/logger");
const db = require("../database/db_functions");

router.get("/", async (req, res) => {
  logger.log(
    "info",
    `HTTP ${res.statusCode} ${req.method} /api/cookbook${req.url}`
  );
  const results = await db.getAllRecepies();
  if (results === 500) {
    return res.status(500).send("Unsuccess");
  }
  res.status(200).json(results);
});

router.get("/:recipeName", async (req, res) => {
  logger.log(
    "info",
    `HTTP ${res.statusCode} ${req.method} /api/cookbook${req.url}`
  );

  const recipeName = req.params["recipeName"];
  if (!recipeName) return res.status(404).send("bad URI");
  const result = await db.getRecepie(recipeName);
  if (result === 500) return res.status(500).send("Something went wrong.");
  res.status(200).json(result);
});

module.exports = router;
