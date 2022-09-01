import { videosRepository } from "../repositories/videos-repository";
import { getRequiredDateFormat } from "../utills/date-format";

export const videosService = {
  findVideos() {
    return videosRepository.findVideos();
  },
  getVideoById(id: number) {
    return videosRepository.getVideoById(id);
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
    const createdVideo = videosRepository.createVideo(newVideo);
    return createdVideo;
  },
  updateVideo(id: number) {
    return videosRepository.updateVideo(id);
  },
  deleteVideo(id: number) {
    return videosRepository.deleteVideo(id);
  },
  removeAllData() {
    return videosRepository.removeAllData();
  },
};
