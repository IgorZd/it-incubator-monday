import { getRequiredDateFormat } from "../utills/date-format";

type VideosType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: string[];
};

[
  {
    author: "",
    availableResolutions: ["P144"],
    canBeDownloaded: false,
    createdAt:
      "StringMatching /d{4}-[01]d-[0-3]dT[0-2]d:[0-5]d:[0-5]d.d+([+-][0-2]d:[0-5]d|Z)/",
    id: 0,
    minAgeRestriction: null,
    publicationDate:
      "StringMatching /d{4}-[01]d-[0-3]dT[0-2]d:[0-5]d:[0-5]d.d+([+-][0-2]d:[0-5]d|Z)/",
    title: "",
  },
];

const videos = [
  {
    id: 1,
    title: "About JS - 01",
    author: "it-incubator.eu",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2022-08-23T08:36:01.564Z",
    publicationDate: "2022-08-23T12:36:01.564Z",
    availableResolutions: ["P144"],
  },
  {
    id: 2,
    title: "About JS - 02",
    author: "it-incubator.eu",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2022-08-22T08:36:01.564Z",
    publicationDate: "2022-08-22T12:36:01.564Z",
    availableResolutions: ["P144"],
  },
  {
    id: 3,
    title: "About JS - 03",
    author: "it-incubator.eu",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2022-08-21T08:36:01.564Z",
    publicationDate: "2022-08-21T12:36:01.564Z",
    availableResolutions: ["P144"],
  },
  {
    id: 4,
    title: "About JS - 04",
    author: "it-incubator.eu",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2022-08-20T08:36:01.564Z",
    publicationDate: "2022-08-20T12:36:01.564Z",
    availableResolutions: ["P144"],
  },
  {
    id: 5,
    title: "About JS - 05",
    author: "it-incubator.eu",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2022-08-19T08:36:01.564Z",
    publicationDate: "2022-08-19T12:36:01.564Z",
    availableResolutions: ["P144"],
  },
];

export const isIdExist = (id: number, arrayForChecking: any[]) => {
  const index = arrayForChecking.findIndex((item: any) => item.id === id);
  return index > -1;
};

export const videosRepository = {
  findVideos() {
    return videos;
  },
  getVideoById(id: number) {
    const video = videos.find((item: VideosType) => item.id === id);
    return video;
  },
  createVideo(title: string, author: string, availableResolutions?: string[]) {
    const today = new Date();
    const newVideo = {
      id: +new Date(),
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: `${getRequiredDateFormat(today, "yyyy-MM-DDTHH:mm:ss.SSS")}Z`,
      publicationDate: `${getRequiredDateFormat(
        new Date(today.setDate(today.getDate() + 1)),
        "yyyy-MM-DDTHH:mm:ss.SSS"
      )}Z`,
      availableResolutions: availableResolutions
        ? availableResolutions
        : ["P144"],
    };
    videos.push(newVideo);
    return newVideo;
  },
  updateVideo(id: number) {
    const video = videos.find((item: VideosType) => item.id === id);
    if (video) {
      return true;
    } else {
      return false;
    }
  },
  deleteVideo(id: number) {
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].id === id) {
        videos.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  removeAllData() {
    videos.splice(0, videos.length);
    if (videos.length === 0) {
      return true;
    } else false;
  },
};
