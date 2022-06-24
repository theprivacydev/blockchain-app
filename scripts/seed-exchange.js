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
  } catch (err) {
    console.log(err);
  }

  callback();
};
