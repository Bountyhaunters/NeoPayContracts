const hre = require("hardhat"); 
const {Web3} = require("web3");

async function main() {
    const stack = await hre.ethers.deployContract("STACKOS");
    const neo = await hre.ethers.deployContract("NEO");
    const okx = await hre.ethers.deployContract("OKX");
    
    await stack.waitForDeployment();
    console.log("stack", stack.target);

    await neo.waitForDeployment();
    console.log("neo", neo.target);

    await okx.waitForDeployment();
    console.log("okx", okx.target);

    const poolSN = await hre.ethers.deployContract("POOL", [stack.target, neo.target]);
    await poolSN.waitForDeployment();
    console.log("poolSN", poolSN.target);

    const poolNO = await hre.ethers.deployContract("POOL", [neo.target, okx.target]);
    await poolNO.waitForDeployment();
    console.log("poolNO", poolNO.target);

    const poolSO = await hre.ethers.deployContract("POOL", [stack.target, okx.target]);
    await poolSO.waitForDeployment();
    console.log("poolSO", poolSO.target);

    await stack.approve(poolSN.target, '1000000000000000000000');
    await neo.approve(poolSN.target, '1000000000000000000000');
    await poolSN.addLiquidity('1000000000000000000000', '1000000000000000000000');

    await neo.approve(poolNO.target, '1000000000000000000000');
    await okx.approve(poolNO.target, '1000000000000000000000');
    await poolNO.addLiquidity('1000000000000000000000', '1000000000000000000000');

    await stack.approve(poolSO.target, '1000000000000000000000');
    await okx.approve(poolSO.target, '1000000000000000000000');
    await poolSO.addLiquidity('1000000000000000000000', '1000000000000000000000');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});