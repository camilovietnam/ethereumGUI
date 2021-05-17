const express = require("express");
const app = express();
const port = 8080;
const ROOT_DIR = "/Users/long/PhpstormProjects/EthereumGUI/";
const Web3 = require("web3");
const node1 = "http://localhost:30333";
const node2 = "http://localhost:30334";

app.use(express.static("public"));

let web3 = new Web3(new Web3.providers.HttpProvider());

app.get("/", function (req, res) {
  res.sendFile(ROOT_DIR + "index.html");
});

app.listen(port, function () {
  console.log(`Server running in port ${port}`);
});
