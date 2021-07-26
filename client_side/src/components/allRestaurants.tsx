import React from "react";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { Props, Restaurant } from "../interfaces/interfaces";

class Restaurants extends React.Component<Props, Restaurant> {
  constructor(props: Props) {
    super(props);
    this.state = {
      restaurants: [],
      page: 1,
      error: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:7000/${this.state.page}`)
      .then((res) => {
        this.setState({ restaurants: res.data });
      })
      .catch((e) => {
        if (e.response.status === 400 || e.response.status === 500) {
          this.setState({ error: "Something bad happened!" });
        }
      });
  }

  render() {
    if (this.state.restaurants.length === 0) {
      return (
        <div>
          <LinearProgress color="secondary" />
        </div>
      );
    } else if (this.state.error === "Something bad happened!") {
      <div>Something bad happened</div>;
    } else {
      return (
        <div>
          {this.state.restaurants.map((restaurant) => {
            return (
              <div>
                <p>{restaurant.name}</p>
                <p>{restaurant.address?.street}</p>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Restaurants;
