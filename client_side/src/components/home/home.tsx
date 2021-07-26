import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="homePage">
        <div className="searchBox">
          <h1>Lorem ipsum dolor sit amet</h1>
          <br />
          <Link to="/allRestaurants">
            <button>All Restaurants</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
