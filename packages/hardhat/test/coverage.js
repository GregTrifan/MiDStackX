const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("StackXOwner", function() {
  let stackXOwner;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before(done => {
    setTimeout(done, 2000);
  });

  it("Should deploy StackXOwner", async function() {
    const StackXOwner = await ethers.getContractFactory("StackXOwner");

    stackXOwner = await StackXOwner.deploy();
  });

  describe("Minting", function() {
    it("Fan should be able to mint", async function() {
      const [creator, fan] = await ethers.getSigners();

      await stackXOwner.connect(fan).mint(creator.address);
      expect(await stackXOwner.getTokenAddress(1)).to.equal(creator.address);
      expect(await stackXOwner.connect(fan).getOwnedCreators()).to.contain(
        creator.address
      );
    });
    it("Fan should be able to mint with custom priced NFT", async function() {
      const [creator, fan, creator2] = await ethers.getSigners();
      // Change price for the creator2 NFT
      await stackXOwner
        .connect(creator2)
        .setCreatorPrice(ethers.utils.parseEther("0.1"));
      // Mint the NFT with the custom amount
      await stackXOwner
        .connect(fan)
        .mint(creator2.address, { value: ethers.utils.parseEther("0.1") });
      // Check if the second NFT is minted
      expect(await stackXOwner.getTokenAddress(2)).to.equal(creator2.address);
      // Ensure there are both creators here
      expect(await stackXOwner.connect(fan).getOwnedCreators()).to.contain(
        creator.address,
        creator2.address
      );
    });
  });
});
