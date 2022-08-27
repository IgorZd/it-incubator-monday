import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { productsService } from "../domain/products-service";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";

export const productsRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 3, max: 20 })
  .withMessage("Title should be from 3 to 10 symbols");

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundedProducts = await productsService.findProducts(
    req.query.title ? req.query.title?.toString() : null
  );
  res.send(foundedProducts);
});
productsRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct = await productsService.createProduct(req.body.title);
    res.status(201).send(newProduct);
  }
);
productsRouter.get("/:id", async (req: Request, res: Response) => {
  const product = await productsService.getProductById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});
productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isProductDeleted = await productsService.deleteProduct(req.params.id);
  if (isProductDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
productsRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const isProductUpdated = await productsService.updateProduct(
      req.params.id,
      req.body.title
    );

    if (isProductUpdated) {
      const product = await productsService.getProductById(req.params.id);
      res.send(product);
    } else {
      res.sendStatus(404);
    }
  }
);
