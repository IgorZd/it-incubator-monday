import { MongoClient } from "mongodb";
export type ProductType = {
  id: string;
  title: string;
};

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoUri);
const db = client.db("shop");
export const productsCollection = db.collection<ProductType>("products");

export const runDb = async () => {
  try {
    //connect the client to the server
    await client.connect();
    //establish and verify connection
    await client.db("products").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Can't connect to db");
    //Ensures that the client will close when you finish/error
    await client.close();
  }
};
