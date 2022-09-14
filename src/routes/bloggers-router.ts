import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { isBloggerIdExistMiddleware } from "../middlewares/isIdExist-middleware";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";

import {
  nameValidation,
  youtubeUrlValidation,
} from "../validations/bloggers-validation";
import { bloggersService } from "../domain/bloggers-service";

export const bloggersRouter = Router({});

bloggersRouter.get("/", async (req: Request, res: Response) => {
  const bloggers = await bloggersService.findBloggers();
  res.status(200).send(bloggers);
});

bloggersRouter.post(
  "/",
  authMiddleware,
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const name: string = req.body.name;
    const youtubeUrl: string = req.body.youtubeUrl;
    const newBlogger = await bloggersService.createBlogger(name, youtubeUrl);

    res.status(201).send(newBlogger);
  }
);

bloggersRouter.get(
  "/:bloggerId",
  isBloggerIdExistMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.bloggerId;
    const blogger = await bloggersService.getBloggerById(id);

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
  isBloggerIdExistMiddleware,
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.bloggerId;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const blogger = await bloggersService.updateBlogger(id, name, youtubeUrl);

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
  isBloggerIdExistMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.bloggerId;
    const isVideoDeleted = await bloggersService.deleteBlogger(id);

    if (isVideoDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
