import { postsRepository } from "../repositories/posts-repository";
import { getRequiredDateFormat } from "../utills/date-format";

export const postsService = {
  findPosts() {
    return postsRepository.findPosts();
  },
  getPostById(id: string) {
    return postsRepository.getPostById(id);
  },
  createPosts(data: {
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
  updatePost(
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
  deletePost(id: string) {
    return postsRepository.deletePost(id);
  },
  removeAllData() {
    return postsRepository.removeAllData();
  },
};
