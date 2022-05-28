const Token = artifacts.require("./Token");
require("chai").use(require("chai-as-promised")).should();

contract("Token", (accounts) => {
  describe("deployment", () => {
    it("tracks the name", async () => {
      // Fetch token from blockchain
      const token = await Token.new();
      //Read the token name here...
      const result = await token.name();
      // Check the token name is 'My Name'
      result.should.equal("My Name");
    });
  });
});
