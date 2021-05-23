const express = require("express");
const app = express();
const port = 8080;
const NodeController = require("./Controllers/NodeController");
const AddressController = require("./Controllers/AddressController");
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/balance/:address", function (req, res) {
  res.send("Balance not implemented");
});

/**
 * Adress routes
 */

app.get("/address/:address/balance", AddressController.getBalance);
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
