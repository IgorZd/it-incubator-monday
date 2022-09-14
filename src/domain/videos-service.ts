import { videosRepository } from "../repositories/videos-db-repository";
import { getRequiredDateFormat } from "../utills/date-format";

export const videosService = {
  async findVideos() {
    return videosRepository.findVideos();
  },
  async getVideoById(id: string) {
    return videosRepository.getVideoById(id);
  },
  async createVideo(
    title: string,
    author: string,
    minAgeRestriction: number | null,
    availableResolutions?: string[]
  ) {
    const today = new Date();
    const newVideo = {
      id: `${+new Date()}`,
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: minAgeRestriction,
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
    return videosRepository.updateVideo(id, data);
  },
  async deleteVideo(id: string) {
    return videosRepository.deleteVideo(id);
  },
  async removeAllData() {
    return videosRepository.removeAllData();
  },
};
