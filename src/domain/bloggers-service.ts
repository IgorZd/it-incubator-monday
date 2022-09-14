import { bloggersRepository } from "../repositories/bloggers-db-repository";
import { getRequiredDateFormat } from "../utills/date-format";

export const bloggersService = {
  async findBloggers() {
    return bloggersRepository.findBloggers();
  },
  async createBlogger(name: string, youtubeUrl: string) {
    const newBlogger = {
      id: `${+new Date()}`,
      name,
      youtubeUrl,
      createdAt: `${getRequiredDateFormat(
        new Date(),
        "yyyy-MM-DDTHH:mm:ss.SSS"
      )}Z`,
    };
    const createdBlogger = bloggersRepository.createBlogger(newBlogger);
    return createdBlogger;
  },
  async getBloggerById(id: string) {
    return bloggersRepository.getBloggerById(id);
  },
  async updateBlogger(id: string, name: string, youtubeUrl: string) {
    const updatedBlogger = bloggersRepository.updateBlogger(
      id,
      name,
      youtubeUrl
    );
    return updatedBlogger;
  },
  async deleteBlogger(id: string) {
    return bloggersRepository.deleteBlogger(id);
  },
  async removeAllData() {
    return bloggersRepository.removeAllData();
  },
};
