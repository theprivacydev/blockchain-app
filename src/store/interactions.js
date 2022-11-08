import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  exchangeLoaded,
  cancelledOrdersLoaded
} from "./actions";
import Web3 from "web3";
import Token from "../abis/Token.json";
import Exchange from "../abis/Exchange.json";

const web3 = new Web3(window.ethereum);

export const loadWeb3 = (dispatch) => {
  dispatch(web3Loaded(web3));
  return web3;
};

export const loadAccount = async (dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });
  const account = web3.utils.toChecksumAddress(accounts[0]);
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
    dispatch(tokenLoaded(token));
    return token;
  } catch (error) {
    return null;
  }
};

export const loadExchange = async (dispatch) => {
  const networkId = await web3.eth.net.getId();
  try {
    const exchange = new web3.eth.Contract(
      Exchange.abi,
      Exchange.networks[networkId].address
    );
    dispatch(exchangeLoaded(exchange));
    return exchange;
  } catch (error) {
    return null;
  }
};

export const loadAllOrders = async (exchange, dispatch) => {
  // Get all cancelled orderes with the "Cancel" event stream
  const cancelStream = await exchange.getPastEvents("Cancel", {
    fromBlock: 0,
    toBlock: "latest"
  });
  const cancelledOrders = cancelStream.map((event) => event.returnValues);
  //Add cancelled orders to redux store
  dispatch(cancelledOrdersLoaded(cancelledOrders));

  // Get filled ordered with "Trade" event stream

  // Get all orderes with the "Order" event stream
};
