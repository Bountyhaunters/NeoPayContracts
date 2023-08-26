// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract STACKOS is ERC20 {
    constructor() ERC20("STACKOS", "STACK") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}