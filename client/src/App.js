import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ExerciseForm from "./components/ExerciseForm/ExerciseForm";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthProvider, {
  AuthContext
} from "./components/auth/Context/AuthProvider";

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
                    render={routeProps => <Login {...routeProps} />}
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
