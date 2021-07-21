import React from "react";
import ListIcon from "@material-ui/icons/List";

class Options extends React.Component<{}, { explore: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { explore: false };
  }

  render() {
    return (
      <div>
        <ListIcon
          onClick={() => {
            this.setState({ explore: !this.state.explore });
          }}
          fontSize="medium"
          style={{ color: "white" }}
        />
        {this.state.explore ? (
          <ul>
            <li>Home</li>
            <li>Restaurants</li>
            <li>Food Items</li>
            <li>Signup as user</li>
            <li>Login as user</li>
            <li>Register your restaurant</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Options;
