import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="Navigation">
      <nav id="header" role="navigation">
        <div id="nav-tabs">
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="food.html">Food</a>
          </li>
          <li>
            <a href="homeImprovements.html">Home Improvements</a>
          </li>
          <li>
            <a href="Arts">Arts</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
          <li>
            <a href="logout.html">Logout</a>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
