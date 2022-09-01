import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { videosService } from "../domain/videos-service";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import {
  isIdExist,
  isResolutionValid,
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
  .optional()
  .isBoolean()
  .withMessage("CanBeDownloade should be boolean");
const minAgeRestrictionValidation = body("minAgeRestriction")
  .optional()
  .isFloat({
    min: 1,
    max: 18,
  })
  .withMessage("MinAgeRestriction should be in range between 1 and 18");
const publicationDateValidation = body("publicationDate")
  .matches(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/)
  .withMessage("Incorrect format");

const validation = [
  titleValidation,
  authorValidation,
  canBeDownloadedValidation,
  minAgeRestrictionValidation,
];
videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosService.findVideos();
  res.status(200).send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const videos = videosService.findVideos();
  const video = videosService.getVideoById(id);
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
      res.status(400).send({
        errorsMessages: [
          { message: "Invalid resolutions", field: "availableResolutions" },
        ],
      });
      return;
    }
    const newVideo = videosService.createVideo(
      title,
      author,
      availableResolutions
    );
    res.status(201).send(newVideo);
  }
);

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const isVideoDeleted = videosService.deleteVideo(id);

  if (isVideoDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

videosRouter.put(
  "/:id",
  ...validation,
  publicationDateValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const isVideoUpdated = videosService.updateVideo(id);
    const videos = videosService.findVideos();
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;

    if (!isIdExist(id, videos)) {
      res.sendStatus(404);
    } else if (isVideoUpdated) {
      const video = videosService.getVideoById(id);
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
