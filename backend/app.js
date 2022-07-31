const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const projects = require("./routes/project_routes");
const cookbook = require("./routes/cookbook_routes");
const admin_site = require("./routes/admin_routes");
const auth = require("./routes/authentication");

const app = express();
const port = 3001;

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse cookies
app.use(cookieParser());

// authentication

// TODO: fix cors config
app.use(cors());
app.use("/static", express.static("static"));


// endpoints
// TODO: return json objects as response

app.use("/api/projects", projects);
app.use("/api/cookbook", cookbook);

// authentication
app.use("/api/login", auth);

// admin
app.use("/api/admin", admin_site);


app.listen(port, () => console.log(`Homepage REST API listening on port ${port}`))