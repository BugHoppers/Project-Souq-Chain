var Items = artifacts.require("./Items.sol");

module.exports = function(deployer) {
  deployer.deploy(Items);
};
