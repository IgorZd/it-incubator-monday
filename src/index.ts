import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";
import { videosRouter } from "./routes/videos-router";
import { bloggersRouter } from "./routes/bloggers-router";
import { postsRouter } from "./routes/posts-router";
import { testingRouter } from "./routes/testing-router";
import { runDb } from "./repositories/db";

const app = express();
const port = process.env.PORT || 3001;

const parserMiddleware = bodyParser({});
const corsMiddleware = cors();

app.use(parserMiddleware);
app.use(corsMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Igor123");
});

app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);
app.use("/videos", videosRouter);
app.use("/bloggers", bloggersRouter);
app.use("/posts", postsRouter);
app.use("/testing", testingRouter);

const startApp = async () => {
  //@TODO когда начну подключать Mongo, нужно раскомментировать!!!
  // await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

// start App
startApp();
