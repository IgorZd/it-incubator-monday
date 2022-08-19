import { Router, Request, Response } from "express";
import { videosRepository } from "../repositories/videos-repository";

const videos = [
  { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
  { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
  { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
  { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
  { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

export const videosRouter = Router({});

videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosRepository.findVideos();
  res.status(200).send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const video = videosRepository.getVideoById(id);

  if (video) {
    res.status(200).send(video);
  } else {
    res.send(404);
  }
});

videosRouter.post("/", (req: Request, res: Response) => {
  const title = req.body.title;

  if (typeof title === "undefined") {
    res.status(400).send({
      errorsMessages: [
        {
          message: `Title doesn't exist. You should send title`,
          field: "title",
        },
      ],
    });
  } else if (title.length === 0) {
    res.status(400).send({
      errorsMessages: [
        {
          message: `Title is empty`,
          field: "title",
        },
      ],
    });
  } else if (title.length > 40) {
    res.status(400).send({
      errorsMessages: [
        {
          message: `Max length of title is 40`,
          field: "title",
        },
      ],
    });
  } else {
    const newVideo = videosRepository.createVideo(title);
    res.send(newVideo);
  }
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
  const isVideoDeleted = videosRepository.deleteVideo(+req.params.id);
  if (isVideoDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

videosRouter.put("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const isVideoUpdated = videosRepository.updateVideo(id);
  const title = req.body.title;

  if (isVideoUpdated) {
    if (typeof title === "undefined") {
      res.status(400).send({
        errorsMessages: [
          {
            message: `Title doesn't exist. You should send title`,
            field: "title",
          },
        ],
      });
    } else if (title.length === 0) {
      res.status(400).send({
        errorsMessages: [
          {
            message: `Title is empty`,
            field: "title",
          },
        ],
      });
    } else if (title.length > 40) {
      res.status(400).send({
        errorsMessages: [
          {
            message: `Max length of title is 40`,
            field: "title",
          },
        ],
      });
    } else {
      const video = videosRepository.getVideoById(id);
      if (video) {
        video.title = title;
        res.status(204).send(video);
      }
    }
  } else {
    res.status(404);
  }
});
