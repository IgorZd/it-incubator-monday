const bloggers = [
  { id: 1, name: "MINSKI", youtubeUrl: "https://www.youtube.com/c/VRYBY" },
  {
    id: 2,
    name: "жизнь-малина",
    youtubeUrl: "https://www.youtube.com/channel/UCevXOj07WgmJ8f39rGEmVDA",
  },
  {
    id: 3,
    name: "Точка G // как зарабатывают в IT",
    youtubeUrl: "https://www.youtube.com/c/tochkaGit",
  },
  {
    id: 4,
    name: "Tamara Eidelman ",
    youtubeUrl: "https://www.youtube.com/c/TamaraEidelmanHistory",
  },
];

export const bloggersRepository = {
  findBloggers() {
    return bloggers;
  },
  createBlogger(name: string, youtubeUrl: string) {
    const newBlogger = {
      id: +new Date(),
      name,
      youtubeUrl,
    };
    bloggers.push(newBlogger);
    return newBlogger;
  },
  getBloggerById(id: number) {
    const blogger = bloggers.find(
      (item: { id: number; name: string; youtubeUrl: string }) => item.id === id
    );
    return blogger;
  },
  updateBlogger(id: number) {
    const blogger = bloggers.find(
      (item: { id: number; name: string; youtubeUrl: string }) => item.id === id
    );
    if (blogger) {
      return true;
    } else {
      false;
    }
  },
  deleteBlogger(id: number) {
    for (let i = 0; i < bloggers.length; i++) {
      if (bloggers[i].id === id) {
        bloggers.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};
