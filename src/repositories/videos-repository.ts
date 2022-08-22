const videos = [
  { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
  { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
  { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
  { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
  { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

export const isIdExist = (id: number, arrayForChecking: any[]) => {
  const index = arrayForChecking.findIndex((item: any) => item.id === id);
  return index > -1;
};

export const videosRepository = {
  findVideos() {
    return videos;
  },
  getVideoById(id: number) {
    const video = videos.find(
      (item: { id: number; title: string; author: string }) => item.id === id
    );
    return video;
  },
  createVideo(title: string) {
    const newVideo = {
      id: +new Date(),
      title,
      author: "it-incubator.eu",
    };
    videos.push(newVideo);
    return newVideo;
  },
  updateVideo(id: number) {
    const video = videos.find(
      (item: { id: number; title: string; author: string }) => item.id === id
    );
    if (video) {
      return true;
    } else {
      false;
    }
  },
  deleteVideo(id: number) {
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].id === id) {
        videos.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};
