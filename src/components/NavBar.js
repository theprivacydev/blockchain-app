import React from "react";

function NavBar({brand, account}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/#">
        {brand}
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
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Link 1
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Link 2
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
