const express = require("express")

const app = express();
const port = 3000;

// endpoints
// index /
app.get("/", (req, res) => {
  res.send("Hello World!")
});

app.listen(port, () => console.log(`Homepage REST API listening on port ${port}`))