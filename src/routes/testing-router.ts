import { Router, Request, Response } from "express";
import { videosRepository } from "../repositories/videos-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  videosRepository.removeAllData();
  res.sendStatus(204);
});
