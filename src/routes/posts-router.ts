import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { postsRepository } from "../repositories/posts-repository";

export const postsRouter = Router({});
const generateValidation = (fieldName: string, name: string) => {
  return body(`${fieldName}`)
    .trim()
    .isLength(
      fieldName === "data.title"
        ? { min: 1, max: 30 }
        : fieldName === "data.shortDescription"
        ? { min: 1, max: 100 }
        : fieldName === "data.content"
        ? { min: 1, max: 1000 }
        : { min: 1 }
    )
    .withMessage(`${name} should be a string with length more than 1 symbol`)
    .isString()
    .withMessage(`${name} should be a string with length more than 1 symbol`);
};

const validations = [
  generateValidation("data.title", "Title"),
  generateValidation("data.shortDescription", "Short description"),
  generateValidation("data.content", "Content"),
  generateValidation("data.bloggerName", "Blogger name"),
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
    const data = req.body.data;
    const newPost = postsRepository.createPosts(data);
    res.send(newPost);
  }
);

postsRouter.get("/:postId", (req: Request, res: Response) => {
  const id = +req.params.postId;
  const post = postsRepository.getPostById(id);

  if (post) {
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
    const isPostUpdated = postsRepository.updatePost(id);
    const data = req.body.data;

    if (isPostUpdated) {
      const post = postsRepository.getPostById(id);
      if (post) {
        post.title = data.title;
        post.shortDescription = data.shortDescription;
        post.content = data.content;
        post.bloggerName = data.bloggerName;
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
