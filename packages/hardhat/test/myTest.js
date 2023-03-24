const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("My Dapp", function() {
  let stackXOwner;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before(done => {
    setTimeout(done, 2000);
  });

  describe("StackXOwner", function() {
    it("Should deploy StackXOwner", async function() {
      const StackXOwner = await ethers.getContractFactory("StackXOwner");

      stackXOwner = await StackXOwner.deploy();
    });

    describe("Minting", function() {
      it("Should be able to mint", async function() {
        const [creator, fan] = await ethers.getSigners();

        await stackXOwner.connect(fan).mint(creator.address);
        expect(await stackXOwner.getTokenAddress(1)).to.equal(creator.address);
        expect(await stackXOwner.connect(fan).getOwnedCreators()).to.contain(
          creator.address
        );
      });
    });
  });
});
