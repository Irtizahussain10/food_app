import React from "react";
import Options from "./options";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import "./navbar.css";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navBar">
        <Options />
        <label>
          <LocalDiningIcon style={{ color: "black" }} />
          XYZ Food Services
        </label>
        <div>
          <label>Login</label>
          <label>Signin</label>
        </div>
      </div>
    );
  }
}

export default NavBar;
