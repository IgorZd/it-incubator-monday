import { postsRepository } from "../repositories/posts-db-repository";
import { getRequiredDateFormat } from "../utills/date-format";

export const postsService = {
  async findPosts() {
    return postsRepository.findPosts();
  },
  async getPostById(id: string) {
    return postsRepository.getPostById(id);
  },
  async createPosts(data: {
    title: string;
    shortDescription: string;
    content: string;
    bloggerId: string;
    bloggerName: string;
  }) {
    const { title, shortDescription, content, bloggerId, bloggerName } = data;
    const newPost = {
      id: `${+new Date()}`,
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName,
      createdAt: `${getRequiredDateFormat(
        new Date(),
        "yyyy-MM-DDTHH:mm:ss.SSS"
      )}Z`,
    };
    const createdPost = postsRepository.createPosts(newPost);

    return createdPost;
  },
  async updatePost(
    id: string,
    data: {
      title: string;
      shortDescription: string;
      content: string;
      bloggerId: string;
      bloggerName: string;
    }
  ) {
    return postsRepository.updatePost(id, data);
  },
  async deletePost(id: string) {
    return postsRepository.deletePost(id);
  },
  async removeAllData() {
    return postsRepository.removeAllData();
  },
};
