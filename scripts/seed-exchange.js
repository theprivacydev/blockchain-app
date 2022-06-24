const { ether, tokens } = require("../test/helpers");

const Token = artifacts.require("Token");
const Exchange = artifacts.require("Exchange");

module.exports = async function (callback) {
  try {
    //Fetch accounts
    const accounts = await web3.eth.getAccounts();

    //Fetch deployed token
    const token = await Token.deployed();
    console.log("token fetched: ", token.address);

    //Fetch the deployed exchange
    const exchange = await Exchange.deployed();
    console.log("exchange fetched: ", exchange.address);

    // Give tokens to the first account
    const sender = accounts[0];
    const receiver = accounts[1];
    let amount = web3.utils.toWei("10000", "ether"); // 10,000 tokens

    await token.transfer(receiver, amount, { from: sender });
    console.log(`transferred ${amount} tokens from ${sender} to ${receiver}`);

    // Set up exchange users
    const user1 = accounts[0];
    const user2 = accounts[1];

    // User 1 Deposits Ether
    amount = 1;
    await exchange.depositEther({ from: user1, value: ether(amount) });
    console.log(`Deposited: ${amount} Ether from ${user1}`);

    // User 2 approves tokens
    amount = 10000;
    await token.approve(exchange.address, tokens(amount), { from: user2 });
    console.log(`Approve ${amount} tokens from ${user2}`);

    // User 2 Deposits tokens
    await exhcnage.depositToken(token.address, tokens(amount), { from: user2 });
    console.log(`Deposited ${amount} tokens from ${user2}`);


  } catch (err) {
    console.log(err);
  }

  callback();
};
