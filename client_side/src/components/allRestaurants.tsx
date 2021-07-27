import React from "react";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { Props, Restaurant } from "../interfaces/interfaces";

class Restaurants extends React.Component<Props, Restaurant> {
  numberOfButtons: number;
  constructor(props: Props) {
    super(props);
    this.numberOfButtons = 0;
    this.state = {
      restaurants: [],
      totalRestaurants: 0,
      page: 1,
      error: "",
      isLoading: true,
    };
  }

  handlePrevious = () => {
    if (this.state.page <= 1) {
      this.setState({ page: this.numberOfButtons });
      console.log(this.state.page);
    } else {
      this.setState({ page: this.state.page - 1 });
      console.log(this.state.page);
    }
  };

  handleNext = () => {
    if (this.state.page === this.numberOfButtons) {
      this.setState({ page: 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  }

  fetchCount() {
    axios
      .get("http://localhost:7000/getRestaurantsCount")
      .then((res) => {
        this.setState({ totalRestaurants: res.data });
        this.numberOfButtons = Math.ceil(this.state.totalRestaurants / 20);
      })
      .catch((e) => {
        if (e.response.status === 400 || e.response.status === 500) {
          this.setState({ error: "Something bad happened!" });
        }
      });
  }

  fetchData() {
    axios
      .get(`http://localhost:7000/getRestaurants/${this.state.page}`)
      .then((res) => {
        this.setState({ restaurants: res.data });
        this.setState({ isLoading: false });
      })
      .catch((e) => {
        if (e.response.status === 400 || e.response.status === 500) {
          this.setState({ error: "Something bad happened!" });
        }
      });
  }

  componentDidMount() {
    this.fetchCount();
    this.fetchData();
  }

  componentDidUpdate(_prevProps: any, prevState: any) {
    if (prevState.page !== this.state.page) {
      this.fetchData();
    }
  }

  render() {
    let key = -1;
    if (this.state.isLoading) {
      return (
        <div>
          <LinearProgress color="secondary" />
        </div>
      );
    } else if (this.state.error === "Something bad happened!") {
      <div>{this.state.error}</div>;
    } else {
      return (
        <div>
          {this.state.restaurants.map((restaurant) => {
            key += key;
            let totalGrade = 0;
            let totalAvailableGrades = 0;
            return (
              <div key={key}>
                <p>{restaurant.name}</p>
                <p>
                  {restaurant.address?.street}, Building{" "}
                  {restaurant.address?.building}, {restaurant.borough},
                  (zipcode:
                  {restaurant.address?.zipcode})
                </p>
                <p>Cuisines: {restaurant.cuisine}</p>
                {restaurant.grades?.forEach((grade) => {
                  totalGrade += grade.score;
                  totalAvailableGrades += 20;
                })}
                <p>
                  Scores: {totalGrade}/{totalAvailableGrades} (
                  {totalAvailableGrades / 20} reviews)
                </p>
                <hr />
              </div>
            );
          })}
          <button onClick={this.handlePrevious}>Previous</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
      );
    }
  }
}

export default Restaurants;
