import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            ChurroFlow
          </Link>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/plans" className="page-scroll">
                Plans
              </a>
            </li>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ my: 1.9, mx: 1.5 }}
            >
              LOG IN
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};