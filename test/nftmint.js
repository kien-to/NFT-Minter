const NFTMint = artifacts.require("./NFTMint.sol")

contract("NFTMint", accounts => {

  let contract;
  before(async () => {
    contract = await NFTMint.deployed();
  })
  it("...get deployed", async () => { 
    assert.notEqual(contract, "");
  });
  it("...get minted and added", async() => {
    const result = await contract.mint("Kien");
    let nft = await contract.nfts(0)
    assert(nft, "Kien");
    console.log(nft);
  })
});
