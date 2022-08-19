import { Router, Request, Response } from "express";

const videos = [
  { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
  { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
  { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
  { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
  { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

export const videosRouter = Router({});

videosRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(videos);
});

videosRouter.get("/:videoId", (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const video = videos.find(
    (item: { id: number; title: string; author: string }) => item.id === id
  );

  if (video) {
    res.status(200).send(video);
  } else {
    res.send(404);
  }
});

videosRouter.post("/", (req: Request, res: Response) => {
  const title = req.body.title;
  const newVideo = {
    id: +new Date(),
    title,
    author: "it-incubator.eu",
  };

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
    videos.push(newVideo);
    res.send(newVideo);
  }
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].id === +req.params.id) {
      videos.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});

videosRouter.put("/:id", (req: Request, res: Response) => {
  const video = videos.find(
    (item: { id: number; title: string; author: string }) =>
      item.id === +req.params.id
  );
  const title = req.body.title;

  if (video) {
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
      video.title = title;
      res.status(204).send(video);
    }
  } else {
    res.status(404);
  }
});
