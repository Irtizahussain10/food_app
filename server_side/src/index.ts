import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import Router from "./routes/restaurants.routes";
import RestaurantControllers from "./controllers/restaurant.controller";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@sandbox.ibylc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

class connect {
  static async connect() {
    try {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 5000,
      });
      let connection = await client.connect();
      return connection;
    } catch (e) {
      console.error(e);
      process.exit();
    }
  }
}

app.use("/", Router);

connect
  .connect()
  .then((client) => {
    RestaurantControllers.connect(client);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
