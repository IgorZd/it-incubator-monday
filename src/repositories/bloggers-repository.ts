export type BloggerType = {
  id: string;
  name: string;
  youtubeUrl: string;
  createdAt: string;
};

let bloggers = [
  {
    id: "1",
    name: "MINSKI",
    youtubeUrl: "https://www.youtube.com/c/VRYBY",
    createdAt: "2022-01-22T08:36:01.564Z",
  },
  {
    id: "2",
    name: "жизнь-малина",
    youtubeUrl: "https://www.youtube.com/channel/UCevXOj07WgmJ8f39rGEmVDA",
    createdAt: "2021-07-18T18:56:01.564Z",
  },
  {
    id: "3",
    name: "Точка G // как зарабатывают в IT",
    youtubeUrl: "https://www.youtube.com/c/tochkaGit",
    createdAt: "2018-03-02T08:36:01.564Z",
  },
  {
    id: "4",
    name: "Tamara Eidelman ",
    youtubeUrl: "https://www.youtube.com/c/TamaraEidelmanHistory",
    createdAt: "2020-08-08T08:06:01.564Z",
  },
];

export const bloggersRepository = {
  findBloggers() {
    return bloggers;
  },
  createBlogger(newBlogger: BloggerType) {
    bloggers.push(newBlogger);
    return newBlogger;
  },
  getBloggerById(id: string) {
    const blogger = bloggers.find((item: BloggerType) => item.id === id);
    return blogger;
  },
  updateBlogger(id: string, name: string, youtubeUrl: string) {
    const blogger = bloggers.find((item: BloggerType) => item.id === id);
    if (blogger) {
      blogger.name = name;
      blogger.youtubeUrl = youtubeUrl;
      return blogger;
    } else {
      false;
    }
  },
  deleteBlogger(id: string) {
    for (let i = 0; i < bloggers.length; i++) {
      if (bloggers[i].id === id) {
        bloggers.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  removeAllData() {
    bloggers = [];
    if (bloggers.length === 0) {
      return true;
    } else false;
  },
};
