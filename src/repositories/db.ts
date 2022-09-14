import { MongoClient } from "mongodb";
import { BloggerType } from "./bloggers-db-repository";
import { PostType } from "./posts-db-repository";
import { ProductType } from "./products-db-repository";
import { VideosType } from "./videos-db-repository";

const mongoUri =
  process.env.mongoURI ||
  "mongodb+srv://admin:31qyZRfkjkpE5E0h@zdanevich-incubator.sy4sfvr.mongodb.net/test";

const client = new MongoClient(mongoUri);
const db = client.db("incubator");
export const productsCollection = db.collection<ProductType>("products");
export const videosCollection = db.collection<VideosType>("videos");
export const postsCollection = db.collection<PostType>("posts");
export const bloggersCollection = db.collection<BloggerType>("bloggers");

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
