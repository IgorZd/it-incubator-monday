import { MongoClient } from "mongodb";

export type TaskState = {
  id: string;
  description: string;
  author: string;
};
export type KanbanBoardType = {
  id: string;
  title: string;
  tasksList: TaskState[];
};

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoUri);
const db = client.db("admin");
export const kanbanBoardCollection =
  db.collection<KanbanBoardType>("kanban-board");

export const runDb = async () => {
  try {
    //connect the client to the server
    await client.connect();
    //establish and verify connection
    await client.db("kanban-board").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Can't connect to db");
    //Ensures that the client will close when you finish/error
    await client.close();
  }
};
