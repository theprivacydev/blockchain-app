import { web3Loaded, web3AccountLoaded } from "./actions";
import Web3 from "web3";

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(window.ethereum);
  dispatch(web3Loaded(web3));
  return web3;
};

export const loadAccount = async (dispatch) => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(web3AccountLoaded(account));
  return account;
};
