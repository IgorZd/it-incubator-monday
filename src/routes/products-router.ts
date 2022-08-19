import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { productsRepository } from "../repositories/products-repository";

export const productsRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("Title should be from 3 to 10 symbols");

productsRouter.get("/", (req: Request, res: Response) => {
  const foundedProducts = productsRepository.findProducts(
    req.query.title ? req.query.title?.toString() : null
  );
  res.send(foundedProducts);
});
productsRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
  }
);
productsRouter.get("/:id", (req: Request, res: Response) => {
  const product = productsRepository.getProductById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
productsRouter.delete("/:id", (req: Request, res: Response) => {
  const isProductDeleted = productsRepository.deleteProduct(req.params.id);
  if (isProductDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
productsRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const isProductUpdated = productsRepository.updateProduct(
      req.params.id,
      req.body.title
    );

    if (isProductUpdated) {
      const product = productsRepository.getProductById(req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);
