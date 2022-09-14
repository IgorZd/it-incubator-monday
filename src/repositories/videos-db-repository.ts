import { videosCollection } from "./db";

export type VideosType = {
  id: string;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: string[];
};

const resolutionsList = [
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
];
export const isResolutionValid = (checkArr: string[]) =>
  checkArr &&
  checkArr
    .map((item: string, index: number) =>
      resolutionsList.find((el: string) => (el === item ? true : false))
    )
    .filter((item: string | undefined) => item === undefined).length === 0;

export const isIdExist = (id: string | string, arrayForChecking: any[]) => {
  const index = arrayForChecking.findIndex((item: any) => item.id === id);
  return index > -1;
};

export const videosRepository = {
  async findVideos() {
    return videosCollection.find({}).toArray();
  },
  async getVideoById(id: string) {
    let video: VideosType | null = await videosCollection.findOne({ id: id });
    return video;
  },
  async createVideo(newVideo: VideosType) {
    const result = await videosCollection.insertOne(newVideo);

    return newVideo;
  },
  async updateVideo(
    id: string,
    data: {
      title: string;
      author: string;
      availableResolutions: string[];
      canBeDownloaded: boolean;
      minAgeRestriction: number | null;
      publicationDate: string;
      createdAt: string;
    }
  ) {
    const {
      title,
      author,
      availableResolutions,
      canBeDownloaded,
      minAgeRestriction,
      publicationDate,
    } = data;
    const video = await videosCollection.updateOne(
      { id: id },
      {
        $set: {
          title,
          author,
          availableResolutions,
          canBeDownloaded,
          minAgeRestriction,
          publicationDate,
        },
      }
    );
    if (video) {
      return true;
    } else {
      return false;
    }
  },
  async deleteVideo(id: string) {
    const result = await videosCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
  async removeAllData() {
    const videosArr = await videosRepository.findVideos();
    const comapringArrLength = [...videosArr].length;
    const result = await videosCollection.deleteMany({});

    return result.deletedCount === comapringArrLength;
  },
};
