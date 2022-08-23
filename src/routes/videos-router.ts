import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import {
  isIdExist,
  isResolutionValid,
  videosRepository,
} from "../repositories/videos-repository";

export const videosRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 40 })
  .withMessage("Title should consist from 1 to 40 symbols");
const authorValidation = body("author")
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage("Author should consist from 1 to 20 symbols");
const canBeDownloadedValidation = body("canBeDownloaded")
  .isBoolean()
  .withMessage("CanBeDownloade should be boolean");
const minAgeRestrictionValidation = body("minAgeRestriction")
  .isFloat({
    min: 1,
    max: 18,
  })
  .withMessage("MinAgeRestriction should be in range between 1 and 18");
const createdAtValidation = body("createdAt")
  .matches("/d{4}-[01]d-[0-3]dT[0-2]d:[0-5]d:[0-5]d.d+([+-][0-2]d:[0-5]d|Z)/")
  .withMessage("Incorrect format");
const publicationDateValidation = body("publicationDate")
  .matches("/d{4}-[01]d-[0-3]dT[0-2]d:[0-5]d:[0-5]d.d+([+-][0-2]d:[0-5]d|Z)/")
  .withMessage("Incorrect format");
const availableResolutionsValidation = body("availableResolutions");

const validation = [
  titleValidation,
  authorValidation,
  // canBeDownloadedValidation,
  // minAgeRestrictionValidation,
  // createdAtValidation,
  // publicationDateValidation,
  // availableResolutionsValidation,
];
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
  ...validation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    if (!isResolutionValid(availableResolutions)) {
      res.sendStatus(400);
      return;
    }
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
  ...validation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const isVideoUpdated = videosRepository.updateVideo(id);
    const videos = videosRepository.findVideos();
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;

    if (!isIdExist(id, videos)) {
      res.sendStatus(404);
    } else if (isVideoUpdated) {
      const video = videosRepository.getVideoById(id);
      if (video) {
        video.title = title;
        video.author = author;
        video.availableResolutions = availableResolutions;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;
        res.status(204).send(video);
      }
    } else {
      res.sendStatus(404);
    }
  }
);
