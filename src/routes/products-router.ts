import { Router, Request, Response } from "express";
import { productsRepository } from "../repositories/products-repository";

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
  const foundedProducts = productsRepository.findProducts(
    req.query.title ? req.query.title?.toString() : null
  );
  res.send(foundedProducts);
});
productsRouter.post("/", (req: Request, res: Response) => {
  const newProduct = productsRepository.createProduct(req.body.title);
  res.status(201).send(newProduct);
});
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
productsRouter.put("/:id", (req: Request, res: Response) => {
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
});
