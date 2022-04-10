const express = require("express");
const bodyParser = require("body-parser");

const logger = require("../logging/logger");
const db = require("./database/db_functions");
const projects = require("./routes/project_routes");
const cookbook = require("./routes/cookbook_routes")

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/static", express.static("static"));

// endpoints

app.use("/api/projects", projects);
app.use("/api/cookbook", cookbook);

// index /
app.get("/", async (req, res) => {
  logger.log("info", `HTTP ${res.statusCode} ${req.method} ${req.url}`);
  let rows = await db.getAllTechs();
  res.status(200).json(rows)
  // do stuff with rows here
});

app.listen(port, () => console.log(`Homepage REST API listening on port ${port}`))