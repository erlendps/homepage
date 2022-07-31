const express = require("express");
const router = express.Router();
const db = require("../database/db_functions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const upload = multer();


router.post("/", upload.none(), async (req, res) => {
  const username = req.body["username"];
  if (!await db.checkIfUserExists(username)) {
    return res.status(404).send("Username not found.");
  }
  const hashedPassword = req.body["password"];
  const userPassword = await db.getHashedPassword(username);
  bcrypt.compare(hashedPassword, userPassword)
    .then((passwordCheck) => {
      if(!passwordCheck) {
        return response.status(400).send("Passwords does not match");
      }

      // JWT token
      const token = jwt.sign(
        {
          userId: username,
        },
        "RANDOM-TOKEN",
        {expiresIn: "24h"}
      );

      return res.status(200).send({
        message: "Login Successful",
        username: username,
        token,
      });
    })
    .catch((e) => {
      return res.status(400).send("Password does not match.")
    });
});

module.exports = router;
