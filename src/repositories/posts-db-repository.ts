import { postsCollection } from "./db";

export type PostType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: string;
  bloggerName: string;
  createdAt: string;
};

let posts = [
  {
    id: "1",
    title: "Title 1",
    shortDescription: "Short description 1",
    content: "Content 1",
    bloggerId: "1",
    bloggerName: "Blogger name 1",
    createdAt: "2022-01-22T08:36:01.564Z",
  },
  {
    id: "2",
    title: "Title 2",
    shortDescription: "Short description 2",
    content: "Content 2",
    bloggerId: "2",
    bloggerName: "Blogger name 2",
    createdAt: "2021-07-18T18:56:01.564Z",
  },
  {
    id: "3",
    title: "Title 3",
    shortDescription: "Short description 3",
    content: "Content 3",
    bloggerId: "3",
    bloggerName: "Blogger name 3",
    createdAt: "2018-03-02T08:36:01.564Z",
  },
  {
    id: "4",
    title: "Title 4",
    shortDescription: "Short description 4",
    content: "Content 4",
    bloggerId: "4",
    bloggerName: "Blogger name 4",
    createdAt: "2020-08-08T08:06:01.564Z",
  },
];

export const postsRepository = {
  async findPosts() {
    const result = await postsCollection.find({}).toArray();
    return result;
  },
  async getPostById(id: string) {
    const post: PostType | null = await postsCollection.findOne({ id: id });
    return post;
  },
  async createPosts(newPost: PostType) {
    const result = await postsCollection.insertOne(newPost);

    return newPost;
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
    const { title, shortDescription, content, bloggerId, bloggerName } = data;

    const post = await postsCollection.updateOne(
      { id: id },
      { $set: { title, shortDescription, content, bloggerId, bloggerName } }
    );
    if (post) {
      return true;
    } else {
      return false;
    }
  },
  async deletePost(id: string) {
    const result = await postsCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
  async removeAllData() {
    const postsArr = await postsRepository.findPosts();
    const comapringArrLength = [...postsArr].length;
    const result = await postsCollection.deleteMany({});

    return result.deletedCount === comapringArrLength;
  },
};
