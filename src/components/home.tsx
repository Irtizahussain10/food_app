import React from "react";
import "./home.css";

class Home extends React.Component {
  url1 =
    "https://www.listchallenges.com/f/lists/3d06c742-15cc-49b2-8845-7ef42d0c9f97.jpg";
  url2 =
    "https://www.rd.com/wp-content/uploads/2018/12/shutterstock_1161597079.jpg";
  render() {
    return (
      <div className="homePage">
        <div className="aboutUs">
          <h1>ABOUT US</h1>
          <p>
            We bring comfort and ease to your lives by connecting you with
            countless restaurants spread all over Karachi. Book your
            reservations or order now from the comforts of your home!
          </p>
        </div>
        <div className="images">
          <img src={this.url1} className="img1" />
          <img src={this.url2} className="img2" />
        </div>
      </div>
    );
  }
}

export default Home;
