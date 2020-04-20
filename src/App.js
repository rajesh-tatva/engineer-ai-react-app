import React, { Component, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import MainContainer from "../src/Container/MainContainer";
import Navbar from "./Components/Navbar";
import Asteroid from "./Container/Asteroid";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => {
                return <MainContainer {...props} />;
              }}
            ></Route>
            <Route
              path="/view-details/:asteroid_id?/:type?"
              component={(props) => {
                return <Asteroid {...props} />;
              }}
            ></Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}
