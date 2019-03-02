import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import ExerciseForm from "./components/ExerciseForm/ExerciseForm";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthProvider, { AuthContext } from "./components/Context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  state = {
    data: []
  };

  // componentDidMount() {
  //   this.getDataFromDb();
  // }

  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <Router>
        <AuthProvider>
          <AuthContext.Consumer>
            {({ registerUser, loginUser, logoutUser, loading }) => {
              return (
                <div>
                  <Navbar />
                  <Route exact path="/" component={Landing} />
                  <Route
                    exact
                    path="/register"
                    render={routeProps => (
                      <Register {...routeProps} registerUser={registerUser} />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={routeProps => (
                      <Login {...routeProps} loginUser={loginUser} />
                    )}
                  />
                  <ExerciseForm data={data} />
                </div>
              );
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
