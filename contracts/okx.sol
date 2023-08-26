// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OKX is ERC20 {
    constructor() ERC20("OKX", "OKX") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}