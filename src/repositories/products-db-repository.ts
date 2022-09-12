import { productsCollection } from "./db";
export type ProductType = {
  id: string;
  title: string;
};

export const productsRepository = {
  async findProducts(title: string | null): Promise<ProductType[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }

    return productsCollection.find(filter).toArray();
  },
  async getProductById(id: string): Promise<ProductType | null> {
    let product: ProductType | null = await productsCollection.findOne({
      id: id,
    });
    return product;
  },
  async createProduct(newProduct: ProductType): Promise<ProductType> {
    const result = await productsCollection.insertOne(newProduct);

    return newProduct;
  },
  async updateProduct(id: string, title: string): Promise<boolean> {
    const result = await productsCollection.updateOne(
      { id: id },
      { $set: { title: title } }
    );

    return result.modifiedCount === 1;
  },
  async deleteProduct(id: string): Promise<boolean> {
    const result = await productsCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
