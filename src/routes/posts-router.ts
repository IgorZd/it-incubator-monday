import { Router, Request, Response } from "express";
import { postsService } from "../domain/posts-service";
import { authMiddleware } from "../middlewares/auth-middleware";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { isPostIdExistMiddleware } from "../middlewares/isIdExist-middleware";
import { bloggersRepository } from "../repositories/bloggers-db-repository";

import {
  bloggerIdValidation,
  contentValidation,
  shortDescriptionValidation,
  titleValidation,
} from "../validations/posts-validation";

export const postsRouter = Router({});

const validations = [
  bloggerIdValidation,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
];

postsRouter.get("/", async (req: Request, res: Response) => {
  const videos = await postsService.findPosts();
  res.status(200).send(videos);
});

postsRouter.post(
  "/",
  authMiddleware,
  ...validations,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blogger = await bloggersRepository.getBloggerById(req.body.bloggerId);

    if (blogger) {
      const data = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: req.body.bloggerId,
        bloggerName: blogger.name,
      };
      const newPost = await postsService.createPosts(data);
      res.status(201).send(newPost);
    }
  }
);

postsRouter.get(
  "/:postId",
  isPostIdExistMiddleware,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.postId;
    const post = await postsService.getPostById(id);

    if (post) {
      res.status(200).send(post);
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.put(
  "/:postId",
  authMiddleware,
  isPostIdExistMiddleware,
  ...validations,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.postId;
    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    const bloggerId = req.body.bloggerId;
    const blogger = await bloggersRepository.getBloggerById(req.body.bloggerId);

    if (blogger) {
      const data = {
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: blogger.name,
      };
      const post = await postsService.updatePost(id, data);

      if (post) {
        res.status(204).send(post);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/:postId",
  authMiddleware,
  isPostIdExistMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.postId;
    const isPostDeleted = await postsService.deletePost(id);

    if (!isPostDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  }
);
