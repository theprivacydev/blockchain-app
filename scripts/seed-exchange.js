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

  } catch (err) {
    console.log(err);
  }

  callback();
};
