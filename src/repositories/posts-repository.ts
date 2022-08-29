export interface PostType {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
  bloggerName: string;
}

const posts = [
  {
    id: 1,
    title: "Title 1",
    shortDescription: "Short description 1",
    content: "Content 1",
    bloggerId: 1,
    bloggerName: "Blogger name 1",
  },
  {
    id: 2,
    title: "Title 2",
    shortDescription: "Short description 2",
    content: "Content 2",
    bloggerId: 2,
    bloggerName: "Blogger name 2",
  },
  {
    id: 3,
    title: "Title 3",
    shortDescription: "Short description 3",
    content: "Content 3",
    bloggerId: 3,
    bloggerName: "Blogger name 3",
  },
  {
    id: 4,
    title: "Title 4",
    shortDescription: "Short description 4",
    content: "Content 4",
    bloggerId: 4,
    bloggerName: "Blogger name 4",
  },
];

export const postsRepository = {
  findPosts() {
    return posts;
  },
  getPostById(id: number) {
    const post = posts.find((item: PostType) => item.id === id);
    return post;
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
    posts.push(newPost);
    return newPost;
  },
  updatePost(id: number) {
    const post = posts.find((item: PostType) => item.id === id);
    if (post) {
      return true;
    } else {
      false;
    }
  },
  deletePost(id: number) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1);
        return true;
      }
    }

    return false;
  },
  removeAllData() {
    posts.splice(0, posts.length);
    if (posts.length === 0) {
      return true;
    } else false;
  },
};
