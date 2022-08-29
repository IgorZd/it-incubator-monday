import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { isIdExistMiddleware } from "../middlewares/isIdExist-middleware";
import {
  bloggersRepository,
  BloggerType,
} from "../repositories/bloggers-repository";
import { postsRepository } from "../repositories/posts-repository";
import {
  bloggerIdValidation,
  contentValidation,
  shortDescriptionValidation,
  titleValidation,
} from "../validations/posts-validation";

export const postsRouter = Router({});

const bloggers = bloggersRepository.findBloggers();
const posts = postsRepository.findPosts();

const validations = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  bloggerIdValidation,
];

const getInfoAboutBlogger = (bloggerId: number, bloggers: BloggerType[]) => {
  const isBloggerExist =
    bloggers.findIndex((item: BloggerType) => item.id === bloggerId) > -1;
  const indexOfBlogger = bloggers.findIndex(
    (item: BloggerType) => item.id === bloggerId
  );
  return { isBloggerExist, indexOfBlogger };
};

postsRouter.get("/", (req: Request, res: Response) => {
  const videos = postsRepository.findPosts();
  res.status(200).send(videos);
});

postsRouter.post(
  "/",
  ...validations,
  authMiddleware,
  inputValidationMiddleware,
  isIdExistMiddleware(bloggers, "bloggerId"),
  (req: Request, res: Response) => {
    const blogger = bloggersRepository.getBloggerById(+req.body.bloggerId);

    if (blogger) {
      const data = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: +req.body.bloggerId,
        bloggerName: blogger.name,
      };
      const newPost = postsRepository.createPosts(data);
      res.status(201).send(newPost);
    }
  }
);

postsRouter.get(
  "/:id",
  isIdExistMiddleware(posts),
  (req: Request, res: Response) => {
    const id = +req.params.d;
    const post = postsRepository.getPostById(id);

    if (post) {
      res.status(200).send(post);
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.put(
  "/:id",
  ...validations,
  authMiddleware,
  inputValidationMiddleware,
  isIdExistMiddleware(bloggers, "bloggerId"),
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    const bloggerId = +req.body.bloggerId;
    const blogger = bloggersRepository.getBloggerById(+req.body.bloggerId);

    if (blogger) {
      const data = {
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: blogger.name,
      };
      const post = postsRepository.updatePost(id, data);

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
  "/:id",
  authMiddleware,
  isIdExistMiddleware(posts),
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const isPostDeleted = postsRepository.deletePost(id);

    if (!isPostDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  }
);
