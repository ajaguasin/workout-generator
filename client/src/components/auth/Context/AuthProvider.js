import React, { Component } from "react";
import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isAuthenticated: false,
    user: {},
    loading: false
  };

  registerUser = (userData, history) => {
    axios
      .post("/api/users/register", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err => console.log(err));
  };

  loginUser = userData => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.setCurrentUser(decoded);
      })
      .catch(err => console.log(err));
  };

  setCurrentUser = decoded => {
    this.setState({ isAuthenticated: true, user: decoded });
  };

  setUserLoading = () => {
    this.setState({ loading: true });
  };

  logoutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    this.setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    this.setCurrentUser({});
  };

  componentDidMount() {}
  render() {
    return (
      <AuthContext.Provider
        value={{
          registerUser: this.registerUser,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser,
          loading: this.state.loading
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default AuthProvider;
