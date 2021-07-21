import React from "react";
import NavBar from "./components/navbar";
import Home from "./components/home";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Home />
      </div>
    );
  }
}

export default App;
