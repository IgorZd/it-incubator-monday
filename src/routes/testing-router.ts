import { Router, Request, Response } from "express";
import { bloggersRepository } from "../repositories/bloggers-repository";
import { postsRepository } from "../repositories/posts-repository";
import { videosRepository } from "../repositories/videos-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  console.log("all ");
  videosRepository.removeAllData();
  bloggersRepository.removeAllData();
  postsRepository.removeAllData();
  console.log("before the end");
  res.sendStatus(204);
});
