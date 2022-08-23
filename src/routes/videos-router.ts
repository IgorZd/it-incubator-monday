import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { isIdExist, videosRepository } from "../repositories/videos-repository";

export const videosRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 40 })
  .withMessage("Title should consist from 1 to 40 symbols");
const authorValidation = body("author")
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage("Author should consist from 1 to 20 symbols");

videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosRepository.findVideos();
  res.status(200).send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const videos = videosRepository.findVideos();
  const video = videosRepository.getVideoById(id);
  if (!isIdExist(id, videos)) {
    res.sendStatus(404);
  } else if (video) {
    res.status(200).send(video);
  } else {
    res.sendStatus(404);
  }
});

videosRouter.post(
  "/",
  titleValidation,
  authorValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const newVideo = videosRepository.createVideo(
      title,
      author,
      availableResolutions
    );
    res.status(201).send(newVideo);
  }
);

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const isVideoDeleted = videosRepository.deleteVideo(id);

  if (isVideoDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

videosRouter.put(
  "/:id",
  titleValidation,
  authorValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const isVideoUpdated = videosRepository.updateVideo(id);
    const videos = videosRepository.findVideos();
    const title = req.body.title;

    if (!isIdExist(id, videos)) {
      res.sendStatus(404);
    } else if (isVideoUpdated) {
      const video = videosRepository.getVideoById(id);
      if (video) {
        video.title = title;
        res.status(204).send(video);
      }
    } else {
      res.sendStatus(404);
    }
  }
);
