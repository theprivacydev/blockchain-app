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
    loadWeb3(dispatch);
    loadAccount(dispatch);
    loadToken(dispatch);
    loadExchange(dispatch);
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
