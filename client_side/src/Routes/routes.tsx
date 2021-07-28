import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import Home from "../components/home/home";
import Restaurant from "../components/allRestaurants/allRestaurants";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/allRestaurants">
            <Restaurant />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
