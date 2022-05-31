var NFTMint = artifacts.require("./NFTMint.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTMint);
};
