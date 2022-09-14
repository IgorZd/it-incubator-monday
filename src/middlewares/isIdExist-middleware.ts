import { NextFunction, Request, Response } from "express";
import { bloggersRepository } from "../repositories/bloggers-db-repository";

import { postsRepository } from "../repositories/posts-db-repository";

export const isBloggerIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.bloggerId;
  if (typeof id !== "string") {
    res.sendStatus(404);
    return;
  }
  const blogger = await bloggersRepository.getBloggerById(id);

  if (!blogger) {
    res.sendStatus(404);
  } else next();
};

export const isPostIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.postId;
  if (typeof id !== "string") {
    res.sendStatus(404);
    return;
  }
  const post = await postsRepository.getPostById(id);

  if (!post) {
    res.sendStatus(404);
  } else next();
};
