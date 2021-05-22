const express = require("express");
const app = express();
const port = 8080;
const NodeController = require("./Controllers/NodeController");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/balance/:address", function (req, res) {
  res.send("Chingado");
});

/**
 * Node routes
 */

app.get("/node/ping/:address/:port", NodeController.pingNode);
app.get("/node/:address/:port/miner/start", NodeController.startMining);

/**
 * Start!
 */
app.listen(port, function () {
  console.log(`Server running in port ${port}`);
});
