const Web3 = require("web3");
const web3Admin = require("web3admin");

const NodeController = {
  pingNode: async function (req, res) {
    try {
      const nodeAddress = req.params.address;
      const nodePort = req.params.port;

      const web3 = new Web3(
        new Web3.providers.HttpProvider(`http://${nodeAddress}:${nodePort}`)
      );

      const lastBlock = await web3.eth.getBlockNumber();
      console.log("Last block is", lastBlock);

      if (lastBlock) {
        return res.send({
          alive: true,
          nodeAddress,
          nodePort,
          lastBlock,
        });
      } else {
        return res.send({
          alive: false,
        });
      }
    } catch (error) {
      console.log(error);

      return res.send({
        alive: false,
        error: "The server encountered an error",
      });
    }
  },

  startMining: function (req, res) {
    try {
      const nodeAddress = req.params.address;
      const nodePort = req.params.port;

      const web3 = new Web3(
        new Web3.providers.HttpProvider(`http://${nodeAddress}:${nodePort}`)
      );

      web3._extend = web3.extend;
      setTimeout(function () {
        web3Admin.extend(web3);
      }, 1000);

      return res.send({ end: 0 });
    } catch (error) {
      console.log("Error mining", error);
    }
  },
};

module.exports = NodeController;
