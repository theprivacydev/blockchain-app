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
import  NavBar  from "./NavBar";
import Content from "./Content";

function App(props) {
  useEffect(() => {
    loadBlockchainData();
  });

  const dispatch = useDispatch();

  const loadBlockchainData = () => {
    const web3 = loadWeb3(dispatch);
    const account = loadAccount(dispatch);
    const token = loadToken(dispatch);
    const exchange = loadExchange(dispatch);
  };

  return (
    <div>
      <NavBar brand="Fortune Token Exchange" />
      <Content />
    </div>
  );
}

function mapStateToProps(state) {
  return {
   // TO DO
  };
}

export default connect(mapStateToProps)(App);
