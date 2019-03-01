import React, { Component } from "react";
export const AuthrContext = React.createContext();

class AuthProvider extends Component {
  render() {
    return (
      <ViewerContext.Provider value={}>
        {this.props.children}
      </ViewerContext.Provider>
    );
  }
}
export default AuthProvider;
