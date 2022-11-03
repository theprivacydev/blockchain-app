import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
} from "../store/interactions";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Content from "./Content";
import { contractsLoadedSelector } from "../store/selectors";

function App(props) {
  useEffect(() => {
    loadBlockchainData();
  });

  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const web3 = await loadWeb3(dispatch);
    const account = await loadAccount(dispatch);
    const token = await loadToken(dispatch);
    if (!token) {
      window.alert(
        "Token smart contract not detected on the current network. Please select another network with Metamask."
      );
    }
    const exchange = loadExchange(dispatch);
    if (!exchange) {
      window.alert(
        "Exchange smart contract not detected on the current network. Please select another network with Metamask."
      );
    }
  };

  return (
    <div>
      <NavBar brand="Fortune Token Exchange" />
      {props.contractsLoaded ? <Content /> : <div className="content"></div>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  };
}

export default connect(mapStateToProps)(App);
