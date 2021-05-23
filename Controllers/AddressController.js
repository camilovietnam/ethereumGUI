const Web3 = require("web3");

const AddressController = {
  getBalance: async function (req, res) {
    try {
      const nodeAddress = req.query.nodeAddress;
      const nodePort = req.query.nodePort;
      const address = req.params.address;

      const web3 = new Web3(
        new Web3.providers.HttpProvider(`http://${nodeAddress}:${nodePort}`)
      );

      let balance = await web3.eth.getBalance(
        "0xb8cb44088f805d56dca0cc9e752528050f1d543e"
      );

      balance = balance.toString();
      balance = await web3.utils.fromWei(await web3.utils.toBN(balance));

      if (!balance) {
        throw new Error("Undefined balance value");
      }

      console.log("Returning balance");
      return res.json({
        address: address,
        nodeAddress,
        nodePort,
        balance,
        unit: "ether",
      });
    } catch (error) {
      console.log("Error in getBalance", error);
      return res.json({
        error,
      });
    }
  },
};

module.exports = AddressController;
