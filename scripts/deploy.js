const hre = require("hardhat"); 
const {Web3} = require("web3");

async function main() {
    const stack = await hre.ethers.deployContract("STACKOS");
    const neo = await hre.ethers.deployContract("NEO");
    
    await stack.waitForDeployment();
    console.log("stack", stack);

    await neo.waitForDeployment();
    console.log("neo", neo.target);

    const pool = await hre.ethers.deployContract("POOL", [stack.target, neo.target]);
    await pool.waitForDeployment();
    console.log("pool", pool.target);

    await stack.approve(pool.target, '1000000000000000000000');
    await neo.approve(pool.target, '1000000000000000000000');
    await pool.addLiquidity('1000000000000000000000', '1000000000000000000000');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});