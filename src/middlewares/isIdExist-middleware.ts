import { NextFunction, Request, Response } from "express";
import { bloggersRepository } from "../repositories/bloggers-repository";
import { postsRepository } from "../repositories/posts-repository";

export const isBloggerIdExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.bloggerId;
  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }
  const blogger = bloggersRepository.getBloggerById(id);

  if (!blogger) {
    res.sendStatus(404);
  } else next();
};

export const isPostIdExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.postId;
  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }
  const post = postsRepository.getPostById(id);

  if (!post) {
    res.sendStatus(404);
  } else next();
};
