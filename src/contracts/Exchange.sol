// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Exchange {
    //Variables
    address public feeAccount; 
    uint256 public feePercent; 
    
    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }
}