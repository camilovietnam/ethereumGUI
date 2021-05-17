const express = require("express");
const app = express();
const port = 8080;

const Web3 = require("web3");

app.use(express.static("public"));

let web3 = new Web3(new Web3.providers.HttpProvider());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, function () {
  console.log(`Server running in port ${port}`);
});
