import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { basicAuthHeaderBase64 } from "../consts/basicAuthHeaderBase64";
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

    const authHeader = req.headers.authorization;
    const isAuthorized = authHeader === basicAuthHeaderBase64;

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
    if (isAuthorized) {
      const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl);

      if (youtubeUrl.length < 101) {
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
  }
);

bloggersRouter.get("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const bloggers = bloggersRepository.findBloggers();
  const blogger = bloggersRepository.getBloggerById(id);

  if (!isIdExist(id, bloggers)) {
    console.log("Is exist?");
    res.sendStatus(404);
    return;
  }
  if (blogger) {
    console.log("Exist");
    res.status(200).send(blogger);
  } else {
    console.log("Error");
    res.sendStatus(404);
  }
});

bloggersRouter.put(
  "/:id",
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;

    const bloggers = bloggersRepository.findBloggers();
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const authHeader = req.headers.authorization;
    const isAuthorized = authHeader === basicAuthHeaderBase64;

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

    if (!isIdExist(id, bloggers)) {
      res.sendStatus(404);
      return;
    }

    if (isAuthorized) {
      const isBloggerUpdated = bloggersRepository.updateBlogger(id);

      if (isBloggerUpdated) {
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
  }
);

bloggersRouter.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const authHeader = req.headers.authorization;
  const isAuthorized = authHeader === basicAuthHeaderBase64;

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

  if (isAuthorized) {
    const isVideoDeleted = bloggersRepository.deleteBlogger(id);
    if (isVideoDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
});
