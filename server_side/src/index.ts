import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

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

async function connect() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let connection = await client.connect();
    let query = await connection
      .db("sample_restaurants")
      .collection("restaurants")
      .findOne();
    console.log(query);
    await client.close();
  } catch (e) {
    console.error(e);
  }
}

app.listen(PORT, () => {
  connect();
  console.log(`Listening at port ${PORT}`);
});
