import { Collection, MongoClient } from "mongodb";
import { Restaurant } from "../interfaces/restaurant.interface";

let restaurants: Collection<Document>;

class RestaurantControllers {
  static async connect(client: MongoClient) {
    try {
      restaurants = await client
        .db("sample_restaurants")
        .collection("restaurants");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  static async fetchRestaurants(page: number) {
    try {
      let cursor: Restaurant[] = await restaurants
        .find()
        .project({
          _id: 0,
          restaurant_id: 0,
        })
        .skip(page * 20)
        .limit(20)
        .toArray();
      return cursor;
    } catch (error) {
      return ["error connecting"];
    }
  }

  static async fetchRestaurantCount() {
    try {
      let cursor: number = await restaurants.countDocuments();
      return cursor;
    } catch (error) {
      return ["error connecting"];
    }
  }
}

export default RestaurantControllers;
