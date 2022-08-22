import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import {
  bloggersRepository,
  BloggerType,
} from "../repositories/bloggers-repository";
import { postsRepository, PostType } from "../repositories/posts-repository";
import { isIdExist } from "../repositories/videos-repository";

export const postsRouter = Router({});
const generateValidation = (fieldName: string, name: string) => {
  return body(`${fieldName}`)
    .trim()
    .isLength(
      fieldName === "title"
        ? { min: 1, max: 30 }
        : fieldName === "shortDescription"
        ? { min: 1, max: 100 }
        : fieldName === "content"
        ? { min: 1, max: 1000 }
        : { min: 1 }
    )
    .withMessage(`${name} should be a string with length more than 1 symbol`)
    .isString()
    .withMessage(`${name} should be a string with length more than 1 symbol`);
};

const validations = [
  generateValidation("title", "Title"),
  generateValidation("shortDescription", "Short description"),
  generateValidation("content", "Content"),
  generateValidation("bloggerId", "Blogger ID"),
];

postsRouter.get("/", (req: Request, res: Response) => {
  const videos = postsRepository.findPosts();
  res.status(200).send(videos);
});

postsRouter.post(
  "/",
  ...validations,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const bloggers = bloggersRepository.findBloggers();
    const isBloggerIdExist =
      bloggers.findIndex(
        (item: BloggerType) => item.id === +req.body.bloggerId
      ) > -1;

    if (isBloggerIdExist) {
      const indexOfBlogger = bloggers.findIndex(
        (item: BloggerType) => item.id === +req.body.bloggerId
      );
      const data = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: +req.body.bloggerId,
        bloggerName: bloggers[indexOfBlogger].name,
      };
      const newPost = postsRepository.createPosts(data);
      res.status(201).send(newPost);
    } else {
      res.status(404).send({
        errorMessages: [
          {
            message: "bloggerId doesn't exist",
            field: "bloggerId",
          },
        ],
      });
    }
  }
);

postsRouter.get("/:postId", (req: Request, res: Response) => {
  const id = +req.params.postId;
  const post = postsRepository.getPostById(id);
  const posts = postsRepository.findPosts();

  if (!isIdExist(id, posts)) {
    res.status(404);
  } else if (post) {
    res.status(200).send(post);
  } else {
    res.send(404);
  }
});

postsRouter.put(
  "/:id",
  ...validations,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const bloggers = bloggersRepository.findBloggers();
    const isBloggerIdExist =
      bloggers.findIndex(
        (item: BloggerType) => item.id === +req.body.bloggerId
      ) > -1;
    const isPostUpdated = postsRepository.updatePost(id);

    if (!isBloggerIdExist) {
      res.status(404);
    } else if (isPostUpdated) {
      const indexOfBlogger = bloggers.findIndex(
        (item: BloggerType) => item.id === +req.body.bloggerId
      );
      const post = postsRepository.getPostById(id);
      if (post) {
        post.title = req.body.title;
        post.shortDescription = req.body.shortDescription;
        post.content = req.body.content;
        post.bloggerId = req.body.bloggerId;
        post.bloggerName = bloggers[indexOfBlogger].name;
        res.status(204).send(post);
      }
    } else {
      res.status(404);
    }
  }
);

postsRouter.delete("/:id", (req: Request, res: Response) => {
  const isPostDeleted = postsRepository.deletePost(+req.params.id);
  if (isPostDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
