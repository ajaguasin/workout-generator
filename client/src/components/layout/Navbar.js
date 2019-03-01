import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav>
        <Link
          to="/"
          style={{
            fontFamily: "monospace"
          }}
        >
          MERN
        </Link>
      </nav>
    );
  }
}
export default Navbar;
