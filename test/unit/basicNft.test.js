const { developmentChains } = require("../../helper-hardhat-config")
const { network, ethers, deployments } = require("hardhat")
const { assert } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT unit tests", () => {
          let basicNft, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNft")
          })

          it("Allows users to mint an NFT, and updates appropriately", async function () {
              const txResponse = await basicNft.mintNft()
              await txResponse.wait(1)
              const tokenURI = await basicNft.tokenURI(0)
              const tokenCounter = await basicNft.getTokenCounter()

              assert.equal(tokenCounter.toString(), "1")
              assert.equal(tokenURI, await basicNft.TOKEN_URI())
          })
      })
