import { bloggersRepository } from "../repositories/bloggers-repository";

export const bloggersService = {
  findBloggers() {
    return bloggersRepository.findBloggers();
  },
  createBlogger(name: string, youtubeUrl: string) {
    const newBlogger = {
      id: +new Date(),
      name,
      youtubeUrl,
    };
    const createdBlogger = bloggersRepository.createBlogger(newBlogger);
    return createdBlogger;
  },
  getBloggerById(id: number) {
    return bloggersRepository.getBloggerById(id);
  },
  updateBlogger(id: number, name: string, youtubeUrl: string) {
    const updatedBlogger = bloggersRepository.updateBlogger(
      id,
      name,
      youtubeUrl
    );
    return updatedBlogger;
  },
  deleteBlogger(id: number) {
    return bloggersRepository.deleteBlogger(id);
  },
  removeAllData() {
    return bloggersRepository.removeAllData();
  },
};
