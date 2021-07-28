import React from "react";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { Props, Restaurant } from "../../interfaces/interfaces";
import "./allRestaurants.css";

class Restaurants extends React.Component<Props, Restaurant> {
  numberOfButtons: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      restaurants: [],
      totalRestaurants: 0,
      page: 1,
      error: "",
      showMap: false,
      isLoading: true,
    };
  }

  //this function will take us to previous page
  handlePrevious = () => {
    if (this.state.page <= 1) {
      this.setState({ page: this.numberOfButtons });
    } else {
      this.setState({ page: this.state.page - 1 });
    }
  };

  //this function will take us to next page
  handleNext = () => {
    if (this.state.page === this.numberOfButtons) {
      this.setState({ page: 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  };

  //this function tells us the total number of restaurants
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

  //this method brings the data of restaurants to us
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

  //this method makes the fetch requests
  componentDidMount() {
    this.fetchCount();
    this.fetchData();
  }

  //this method handles paging
  componentDidUpdate(_prevProps: any, prevState: any) {
    if (prevState.page !== this.state.page) {
      this.fetchData();
    }
  }

  //Display of map
  displayMap = () => {
    this.setState({ showMap: !this.state.showMap });
  };

  //Finally the frontend is rendered
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
        <div className="Container">
          <div className="restaurantsPage">
            {this.state.restaurants.map((restaurant) => {
              key += key;
              let totalGrade = 0;
              let totalAvailableGrades = 0;
              return (
                <div key={key} className="restaurantContainer">
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
                </div>
              );
            })}
          </div>

          <button onClick={this.handlePrevious}>Previous</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
      );
    }
  }
}

export default Restaurants;
