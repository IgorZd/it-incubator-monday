import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { isBloggerIdExistMiddleware } from "../middlewares/isIdExist-middleware";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { bloggersRepository } from "../repositories/bloggers-repository";

import {
  nameValidation,
  youtubeUrlValidation,
} from "../validations/bloggers-validation";

export const bloggersRouter = Router({});

const bloggers = bloggersRepository.findBloggers();

bloggersRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(bloggers);
});

bloggersRouter.post(
  "/",
  authMiddleware,
  inputValidationMiddleware,
  nameValidation,
  youtubeUrlValidation,
  (req: Request, res: Response) => {
    const name: string = req.body.name;
    const youtubeUrl: string = req.body.youtubeUrl;
    const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl);

    res.status(201).send(newBlogger);
  }
);

bloggersRouter.get(
  "/:bloggerId",
  inputValidationMiddleware,
  isBloggerIdExistMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.bloggerId;
    const blogger = bloggersRepository.getBloggerById(id);

    if (blogger) {
      res.status(200).send(blogger);
    } else {
      res.sendStatus(404);
    }
  }
);

bloggersRouter.put(
  "/:bloggerId",
  authMiddleware,
  inputValidationMiddleware,
  isBloggerIdExistMiddleware,
  nameValidation,
  youtubeUrlValidation,
  (req: Request, res: Response) => {
    const id = +req.params.bloggerId;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const blogger = bloggersRepository.updateBlogger(id, name, youtubeUrl);

    if (blogger) {
      res.status(204).send(blogger);
    } else {
      res.sendStatus(404);
    }
  }
);

bloggersRouter.delete(
  "/:bloggerId",
  authMiddleware,
  inputValidationMiddleware,
  isBloggerIdExistMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.bloggerId;
    const isVideoDeleted = bloggersRepository.deleteBlogger(id);

    if (isVideoDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
