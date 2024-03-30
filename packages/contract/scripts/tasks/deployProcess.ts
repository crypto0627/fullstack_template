import { task } from "hardhat/config"
import { readFileSync, writeFileSync } from "../helpers/pathHelper"
task("deploy:contract", "Deploy contract")
  .addParam("contract")
  .setAction(async ({ contract }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory(contract)
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy()
    console.log(`TestToken.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "mainContract.json", addressData)

    await deployContract.deployed()
  },
  )

task("deploy:token", "Deploy Token")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const feeData = await hre.ethers.provider.getFeeData()
    const balance = await hre.ethers.provider.getBalance(signer.address)
    console.log(`balance: ${balance}`)
    console.log(`maxPriorityFeePerGas: ${feeData.maxPriorityFeePerGas}`)
    const pawPointFactory = await hre.ethers.getContractFactory("contracts/Pawpoint.sol:Pawpoint", )
    const amount = BigInt("1000000000000000000000000000000")
    const pawPointDeployContract: any = await pawPointFactory.connect(signer).deploy(amount, {
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      gasLimit: 3000000, // optional: for some weird infra network
    })
    console.log(`Pawpoint.sol deployed to ${pawPointDeployContract.address}`)

    const address = {
      main: pawPointDeployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "Pawpoint.json", addressData)

    await pawPointDeployContract.deployed()

    if (verify) {
      console.log("verifying contract...")
      await pawPointDeployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: pawPointDeployContract.address,
          constructorArguments: ["1000000000000000000000000000000"],
          contract: "contracts/Pawpoint.sol:Pawpoint",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )

task("deploy:nftFactory", "Deploy NFT factory")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const feeData = await hre.ethers.provider.getFeeData()
    const Pawpoint = readFileSync(`scripts/address/${hre.network.name}/`, "Pawpoint.json")
    const pawpointAddress = JSON.parse(Pawpoint).main
    const nftContractFactory = await hre.ethers.getContractFactory("contracts/CouponFactory.sol:CouponFactory", )
    const nftDeployContract: any = await nftContractFactory.connect(signer).deploy(
        pawpointAddress,
      {
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        maxFeePerGas: feeData.maxFeePerGas,
        gasLimit: 6000000, // optional: for some weird infra network
    })
    console.log(`CouponFactory.sol deployed to ${nftDeployContract.address}`)

    const address = {
      main: nftDeployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "CouponFactory.json", addressData)

    await nftDeployContract.deployed()

    if (verify) {
      console.log("verifying nft contract...")
      await nftDeployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: nftDeployContract.address,
          constructorArguments: [
            pawpointAddress,
          ],
          contract: "contracts/CouponFactory.sol:CouponFactory",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )
