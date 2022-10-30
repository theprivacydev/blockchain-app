import { web3Loaded, web3AccountLoaded, tokenLoaded } from "./actions";
import Web3 from "web3";
import Token from "../abis/Token.json";

const web3 = new Web3(window.ethereum);

export const loadWeb3 = (dispatch) => {
  dispatch(web3Loaded(web3));
  return web3;
};

export const loadAccount = async (dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(web3AccountLoaded(account));
  return account;
};

export const loadToken = async (dispatch) => {
  const networkId = await web3.eth.net.getId();
  try {
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[networkId].address
    );
    console.log(token);
    dispatch(tokenLoaded(token));
    return token;
  } catch (error) {
    window.alert(
      "Contract not deployed to the current network. Please select another network with Metamask."
    );
    return null;
  }
};
