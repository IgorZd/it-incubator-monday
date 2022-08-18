import { Router, Request, Response } from "express";

const addresses = [
  { id: "1", city: "Brest", street: "Vereskovay" },
  { id: "2", city: "Warsaw", street: "Suwalska" },
  { id: "3", city: "Jerusalem", street: "Shlomo Ben Yosef" },
];

export const addressesRouter = Router({});

addressesRouter.get("/", (req: Request, res: Response) => {
  res.send(addresses);
});
addressesRouter.get("/:city", (req: Request, res: Response) => {
  const city = addresses.find(
    (item: { city: string; street: string }) => item.city === req.params.city
  );
  if (city) {
    res.send(city);
  } else {
    res.send(404);
  }
});
