import { postsRepository } from "../repositories/posts-repository";

export const postsService = {
  findPosts() {
    return postsRepository.findPosts();
  },
  getPostById(id: number) {
    return postsRepository.getPostById(id);
  },
  createPosts(data: {
    title: string;
    shortDescription: string;
    content: string;
    bloggerId: number;
    bloggerName: string;
  }) {
    const { title, shortDescription, content, bloggerId, bloggerName } = data;
    const newPost = {
      id: +new Date(),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName,
    };
    const createdPost = postsRepository.createPosts(newPost);

    return createdPost;
  },
  updatePost(
    id: number,
    data: {
      title: string;
      shortDescription: string;
      content: string;
      bloggerId: number;
      bloggerName: string;
    }
  ) {
    return postsRepository.updatePost(id, data);
  },
  deletePost(id: number) {
    return postsRepository.deletePost(id);
  },
  removeAllData() {
    return postsRepository.removeAllData();
  },
};
