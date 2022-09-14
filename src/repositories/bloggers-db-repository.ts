import { bloggersCollection } from "./db";

export type BloggerType = {
  id: string;
  name: string;
  youtubeUrl: string;
  createdAt: string;
};

export const bloggersRepository = {
  async findBloggers() {
    return bloggersCollection.find({}).toArray();
  },
  async createBlogger(newBlogger: BloggerType) {
    const result = await bloggersCollection.insertOne(newBlogger);

    return newBlogger;
  },
  async getBloggerById(id: string) {
    let blogger: BloggerType | null = await bloggersCollection.findOne({
      id: id,
    });
    return blogger;
  },
  async updateBlogger(id: string, name: string, youtubeUrl: string) {
    const blogger = await bloggersCollection.updateOne(
      { id: id },
      { $set: { name, youtubeUrl } }
    );
    if (blogger) {
      return true;
    } else {
      return false;
    }
  },
  async deleteBlogger(id: string) {
    const result = await bloggersCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
  async removeAllData() {
    const bloggersArr = await bloggersRepository.findBloggers();
    const comapringArrLength = [...bloggersArr].length;
    const result = await bloggersCollection.deleteMany({});

    return result.deletedCount === comapringArrLength;
  },
};
