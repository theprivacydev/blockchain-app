// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Exchange {
    //Variables
    address public feeAccount; // the account that receives exchange fees
    
    constructor (address _feeAccount) public {
        feeAccount = _feeAccount;
    }
}