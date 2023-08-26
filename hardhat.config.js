require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  // defaultNetwork: "neo_evm_devnet",
  networks: {
    hardhat: {

    },
    neo_evm_devnet: {
      url: "https://evm.ngd.network:32332",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};