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
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
  )
  .withMessage("Incorrect format of url");

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

    if (youtubeUrl.length < 101 && isAuthorized) {
      res.status(201).send(newBlogger);
    } else {
      res.status(400).send({
        errorsMessages: [
          {
            message: "The max length of youtubeUrl is 100 symbols",
            field: "youtubeUrl",
          },
        ],
      });
    }
  }
);

bloggersRouter.get("/:id", (req: Request, res: Response) => {
  const id = `${+req.params.id}`;
  const bloggers = bloggersRepository.findBloggers();
  const blogger = bloggersRepository.getBloggerById(id);

  if (!isIdExist(id, bloggers)) {
    res.sendStatus(404);
    return;
  }
  if (blogger) {
    res.status(200).send(blogger);
  } else {
    res.sendStatus(404);
  }
});

bloggersRouter.put(
  "/:id",
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = `${+req.params.id}`;
    const isBloggerUpdated = bloggersRepository.updateBlogger(id);
    const bloggers = bloggersRepository.findBloggers();
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const isAuthorized = req.get("Authorization");

    if (!isIdExist(id, bloggers)) {
      res.sendStatus(404);
      return;
    }
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
    if (isBloggerUpdated && isAuthorized) {
      const blogger = bloggersRepository.getBloggerById(id);
      if (blogger) {
        if (youtubeUrl.length > 100) {
          res.status(400).send({
            errorsMessages: [
              {
                message: "The max length of youtubeUrl is 100 symbols",
                field: "youtubeUrl",
              },
            ],
          });
        }
        blogger.name = name;
        blogger.youtubeUrl = youtubeUrl;
        res.status(204).send(blogger);
      }
    } else {
      res.sendStatus(404);
    }
  }
);

bloggersRouter.delete("/:id", (req: Request, res: Response) => {
  const id = `${+req.params.id}`;
  const isVideoDeleted = bloggersRepository.deleteBlogger(id);
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

  if (isVideoDeleted && isAuthorized) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
