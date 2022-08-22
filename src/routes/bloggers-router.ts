import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { bloggersRepository } from "../repositories/bloggers-repository";
import { isIdExist } from "../repositories/videos-repository";

export const bloggersRouter = Router({});

const nameValidation = body("name")
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("Name should consist from 1 to 15 symbols");
const youtubeUrlValidation = body("youtubeUrl")
  .trim()
  .isLength({ min: 1, max: 100 })
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
  )
  .withMessage(
    "youtubeUrl should consist from 1 to 100 symbols and has correct structure of url"
  );

bloggersRouter.get("/", (req: Request, res: Response) => {
  const bloggers = bloggersRepository.findBloggers();
  res.status(200).send(bloggers);
});

bloggersRouter.post(
  "/",
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl);
    res.status(201).send(newBlogger);
  }
);

bloggersRouter.get("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const bloggers = bloggersRepository.findBloggers();
  const blogger = bloggersRepository.getBloggerById(id);

  if (!isIdExist(id, bloggers)) {
    res.send(404);
  } else if (blogger) {
    res.status(200).send(blogger);
  } else {
    res.send(404);
  }
});

bloggersRouter.put(
  "/:id",
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const isBloggerUpdated = bloggersRepository.updateBlogger(id);
    const bloggers = bloggersRepository.findBloggers();
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    if (!isIdExist(id, bloggers)) {
      res.send(404);
    } else if (isBloggerUpdated) {
      const blogger = bloggersRepository.getBloggerById(id);
      if (blogger) {
        blogger.name = name;
        blogger.youtubeUrl = youtubeUrl;
        res.status(204).send(blogger);
      }
    } else {
      res.status(404);
    }
  }
);

bloggersRouter.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const isVideoDeleted = bloggersRepository.deleteBlogger(id);
  if (isVideoDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
