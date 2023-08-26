const hre = require("hardhat");

async function main() {
    const stack = await hre.ethers.deployContract("STACKOS");
    const neo = await hre.ethers.deployContract("NEO");
    
    await stack.waitForDeployment();
    console.log("stack", stack.target);

    await neo.waitForDeployment();
    console.log("neo", neo.target);

    const pool = await hre.ethers.deployContract("POOL", [stack.target, neo.target]);
    await pool.waitForDeployment();

    console.log("pool", pool.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});