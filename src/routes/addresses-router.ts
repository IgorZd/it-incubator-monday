import { Router, Request, Response } from "express";
import { addressesRepository } from "../repositories/addresses-repository";

export const addressesRouter = Router({});

addressesRouter.get("/", (req: Request, res: Response) => {
  const foundedAddresses = addressesRepository.findAddresses();
  res.send(foundedAddresses);
});
addressesRouter.get("/:city", (req: Request, res: Response) => {
  const city = addressesRepository.getAddressByCity(req.params.city);

  if (city) {
    res.send(city);
  } else {
    res.send(404);
  }
});
