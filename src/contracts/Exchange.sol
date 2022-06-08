// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
import "./Token.sol";

contract Exchange {
    //Variables
    address public feeAccount; 
    uint256 public feePercent; 
    
    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositToken(address _token, uint256 _amount) public {
        Token(_token).transferFrom(msg.sender, address(this), _amount);
        // Send token to contract
        // Manage deposit - update balance
        // emit event
    }
}