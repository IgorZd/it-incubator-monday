import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser({});

app.use(parserMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Igor123");
});

app.use("/products", productsRouter);

app.use("/addresses", addressesRouter);

// start App
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
