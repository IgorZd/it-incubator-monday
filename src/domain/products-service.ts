import { productsCollection, ProductType } from "../repositories/db";
import { productsRepository } from "../repositories/products-db-repository";

export const productsService = {
  async findProducts(title: string | null): Promise<ProductType[]> {
    return await productsRepository.findProducts(title);
  },
  async getProductById(id: string): Promise<ProductType | null> {
    return await productsRepository.getProductById(id);
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = { id: `${+new Date()}`, title };
    const createdProduct = await productsRepository.createProduct(newProduct);

    return createdProduct;
  },
  async updateProduct(id: string, title: string): Promise<boolean> {
    return await productsRepository.updateProduct(id, title);
  },
  async deleteProduct(id: string): Promise<boolean> {
    return await productsRepository.deleteProduct(id);
  },
};
