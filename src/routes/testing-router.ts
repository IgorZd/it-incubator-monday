import { Router, Request, Response } from "express";
import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { postsRepository } from "../repositories/posts-db-repository";
import { videosRepository } from "../repositories/videos-db-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  videosRepository.removeAllData();
  bloggersRepository.removeAllData();
  postsRepository.removeAllData();
  res.sendStatus(204);
});
