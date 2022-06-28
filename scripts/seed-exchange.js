const { ether, tokens, ETHER_ADDRESS } = require("../test/helpers");

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
    await exchange.depositToken(token.address, tokens(amount), { from: user2 });
    console.log(`Deposited ${amount} tokens from ${user2}`);

     // Seed Cancelled order --------------
    
    // User 1 makes order to get tokens
    let result;
    let orderId;
    result = await exchange.makeOrder(token.address, tokens(100), ETHER_ADDRESS, ether(0.1), {from : user1});
    console.log(`Made order from ${user1}`);

    // User 1 cancels oder
    orderId = result.logs[0].args.id;
    await exchange.cancelOrder(orderId, {from : user1});
    console.log(`Cancelled order from ${user1}`);

    // Seed orders -------------------------

    // User 1 makes order
    result = await exchange.makeOrder(
      token.address,
      tokens(100),
      ETHER_ADDRESS,
      ether(0.1),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User 2 fills order
    orderId = result.logs[0].args.id;
    await exchange.fillOrder(orderId, { from: user2 });
    console.log(`Filled order from ${user2}`);

    // wait 1 second
    await wait(1);

    // User 1 makes another order
    result = await exchange.makeOrder(
      token.address,
      tokens(50),
      ETHER_ADDRESS,
      ether(0.01),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User 2 fills another order
    orderId = result.logs[0].args.id;
    await exchange.fillOrder(orderId, { from: user2 });
    console.log(`Filled order from ${user2}`);

    // Wait 1 second
    await wait(1);

    // User 1 makes final order
    result = await exchange.makeOrder(
      token.address,
      tokens(200),
      ETHER_ADDRESS,
      ether(0.15),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User2 fills final order
    orderId = result.logs[0].args.id;
    await exchange.fillOrder(orderId, { from: user2 });
    console.log(`Filled order from ${user2}`);
  } catch (err) {
    console.log(err);
  }

  // Wait 1 second
  await wait(1);

  // Seed Open orders -----------

    // User 1 makes 10 orders
    for (let i = 0; i <= 10; i++) {
      result = await exchange.makeOrder(token.address, tokens(10 * i), ETHER_ADDRESS, ether(0.01), {from : user1});
      console.log(`Made order from ${user1}`);
      // Wait 1 second
      await wait(1);
    }

  // User 2 makes 10 orders
  for (let i = 0; i <= 10; i++) {
    result = await exchange.makeOrder(ETHER_ADDRESS, ether(0.01), token.address, tokens(10 * i), {from : user2});
    console.log(`Made order from ${user2}`);
    // Wait 1 second
    await wait(1);
  }

  callback();
};
