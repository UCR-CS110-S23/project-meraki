import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav className="Navigation" role="navigation">
        <div id="nav-tabs">
          <PageLink to="/" style={{ color: "white" }}>
            Home
          </PageLink>

          <PageLink to="/food" style={{ color: "white" }}>
            Food
          </PageLink>

          <PageLink to="/homeImprovements" style={{ color: "white" }}>
            Home Improvements
          </PageLink>

          <PageLink to="/arts" style={{ color: "white" }}>
            Arts
          </PageLink>

          <PageLink to="/login" style={{ color: "white" }}>
            Login
          </PageLink>

          <PageLink to="/register" style={{ color: "white" }}>
            Register
          </PageLink>
        </div>
      </nav>
    </>
  );
}

function PageLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navigation;
