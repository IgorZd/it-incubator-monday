import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";
import { videosRouter } from "./routes/videos-router";
import { bloggersRouter } from "./routes/bloggers-router";
import { postsRouter } from "./routes/posts-router";
import { videosRepository } from "./repositories/videos-repository";
import { productsRepository } from "./repositories/products-repository";
import { postsRepository } from "./repositories/posts-repository";
import { bloggersRepository } from "./repositories/bloggers-repository";
import { addressesRepository } from "./repositories/addresses-repository";

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser({});
const corsMiddleware = cors();

app.use(parserMiddleware);
app.use(corsMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Igor123");
});

app.delete("/all-data", (req: Request, res: Response) => {
  // const isProductsEmpty = productsRepository.removeAllData();
  videosRepository.removeAllData();
  // const isPostsEmpty = postsRepository.removeAllData();
  // const isBloggersEmpty = bloggersRepository.removeAllData();
  // const isAddressesEmpty = addressesRepository.removeAllData();
  // if (
  // isProductsEmpty &&
  // isVideosEmpty &&
  // isPostsEmpty &&
  // isBloggersEmpty &&
  // isAddressesEmpty
  // isVideosEmpty
  // ) {
  res.sendStatus(204);
  // } else {
  //   res.sendStatus(404);
  // }
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
