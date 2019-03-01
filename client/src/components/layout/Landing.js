import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }}>
        <p>Create Exercises and add them to your workouts</p>
        <br />
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
export default Landing;
