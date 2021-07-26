import express, { Request, Response } from "express";
import RestaurantControllers from "../controllers/restaurant.controller";

const Router = express.Router();

Router.get("/:page", async (req: Request, res: Response) => {
  try {
    let page = parseInt(req.params.page);
    if (!page) {
      res.status(400).send("Bad Request");
    }
    let restaurants = await RestaurantControllers.fetchRestaurants(page - 1);
    if (restaurants.length === 0) {
      res.status(404).send(restaurants);
    } else if (restaurants[0] === "error connecting") {
      res.status(500).send("Something bad happened!");
    } else {
      res.status(200).send(restaurants);
    }
  } catch (e) {
    res.status(500).send("Something bad happened!");
  }
});

export default Router;
