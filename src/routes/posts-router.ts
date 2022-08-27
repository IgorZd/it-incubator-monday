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
        ? { min: 1, max: 99 }
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
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const bloggers = bloggersRepository.findBloggers();
    const bloggerInfo = getInfoAboutBlogger(+req.body.bloggerId, bloggers);
    const { isBloggerExist, indexOfBlogger } = bloggerInfo;
    const isAuthorized = req.get("Authorization");

    if (!isAuthorized) {
      res.status(401).send({
        errorsMessages: [
          {
            message: "Not authorized",
            field: "Authorization",
          },
        ],
      });
      return;
    }

    if (!isBloggerExist) {
      res.status(400).send({
        errorsMessages: [
          {
            message: "bloggerId doesn't exist",
            field: "bloggerId",
          },
        ],
      });
      return;
    }

    if (isBloggerExist && isAuthorized) {
      const data = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: +req.body.bloggerId,
        bloggerName: bloggers[indexOfBlogger].name,
      };
      const newPost = postsRepository.createPosts(data);
      res.status(201).send(newPost);
    }
  }
);

postsRouter.get("/:postId", (req: Request, res: Response) => {
  const id = +req.params.postId;
  const post = postsRepository.getPostById(id);
  const posts = postsRepository.findPosts();

  if (!isIdExist(id, posts)) {
    res.sendStatus(404);
  } else if (post) {
    res.status(200).send(post);
  } else {
    res.sendStatus(404);
  }
});

postsRouter.put(
  "/:id",
  ...validations,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const bloggers = bloggersRepository.findBloggers();
    const bloggerInfo = getInfoAboutBlogger(+req.body.bloggerId, bloggers);
    const { isBloggerExist, indexOfBlogger } = bloggerInfo;
    const isPostUpdated = postsRepository.updatePost(id);
    const isAuthorized = req.get("Authorization");

    if (!isAuthorized) {
      res.status(401).send({
        errorsMessages: [
          {
            message: "Not authorized",
            field: "Authorization",
          },
        ],
      });
      return;
    }

    if (!isBloggerExist) {
      res.status(400).send({
        errorsMessages: [
          {
            message: "bloggerId doesn't exist",
            field: "bloggerId",
          },
        ],
      });
      return;
    }

    if (isPostUpdated && isAuthorized) {
      const post = postsRepository.getPostById(id);
      if (post) {
        post.title = req.body.title;
        post.shortDescription = req.body.shortDescription;
        post.content = req.body.content;
        post.bloggerId = +req.body.bloggerId;
        post.bloggerName = bloggers[indexOfBlogger].name;
        res.status(204).send(post);
      }
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;

  const posts = postsRepository.findPosts();
  const isPostExist = posts.find((item: PostType) => item.id === id);
  const isAuthorized = req.get("Authorization");

  if (!isAuthorized) {
    res.status(401).send({
      errorsMessages: [
        {
          message: "Not authorized",
          field: "Authorization",
        },
      ],
    });
    return;
  }

  if (!isPostExist) {
    res.sendStatus(404);
    return;
  }

  const isPostDeleted = postsRepository.deletePost(id);
  if (!isPostDeleted) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
});
