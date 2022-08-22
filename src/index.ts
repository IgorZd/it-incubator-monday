import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";
import { videosRouter } from "./routes/videos-router";
import { bloggersRouter } from "./routes/bloggers-router";
import { postsRouter } from "./routes/posts-router";

const app = express();
const port = process.env.PORT || 3000;

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

// start App
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
