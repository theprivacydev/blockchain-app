import React from "react";
import { connect } from "react-redux";
import { accountSelector } from "../store/selectors";

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/#">
        {props.brand}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link small"
              href={`https://etherscan.io/address/${props.account}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {props.account}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state)
  };
}

export default connect(mapStateToProps)(NavBar);
