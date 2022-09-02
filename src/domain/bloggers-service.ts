import { bloggersRepository } from "../repositories/bloggers-repository";
import { getRequiredDateFormat } from "../utills/date-format";

export const bloggersService = {
  findBloggers() {
    return bloggersRepository.findBloggers();
  },
  createBlogger(name: string, youtubeUrl: string) {
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
  getBloggerById(id: string) {
    return bloggersRepository.getBloggerById(id);
  },
  updateBlogger(id: string, name: string, youtubeUrl: string) {
    const updatedBlogger = bloggersRepository.updateBlogger(
      id,
      name,
      youtubeUrl
    );
    return updatedBlogger;
  },
  deleteBlogger(id: string) {
    return bloggersRepository.deleteBlogger(id);
  },
  removeAllData() {
    return bloggersRepository.removeAllData();
  },
};
