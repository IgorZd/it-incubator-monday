import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { isIdExist, videosRepository } from "../repositories/videos-repository";

export const videosRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 40 })
  .withMessage("Title should consist from 1 to 40 symbols");

videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosRepository.findVideos();
  res.status(200).send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const videos = videosRepository.findVideos();
  const video = videosRepository.getVideoById(id);

  if (isIdExist(id, videos) && video) {
    res.status(200).send(video);
  } else {
    res.send(404);
  }
});

videosRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const title = req.body.title;
    const newVideo = videosRepository.createVideo(title);
    res.status(201).send(newVideo);
  }
);

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const videos = videosRepository.findVideos();
  const isVideoDeleted = videosRepository.deleteVideo(id);

  if (isIdExist(id, videos) && isVideoDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

videosRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const isVideoUpdated = videosRepository.updateVideo(id);
    const videos = videosRepository.findVideos();
    const title = req.body.title;

    if (isIdExist(id, videos) && isVideoUpdated) {
      const video = videosRepository.getVideoById(id);
      if (video) {
        video.title = title;
        res.status(204).send(video);
      }
    } else {
      res.status(404);
    }
  }
);
