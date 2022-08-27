export type ProductType = {
  id: string;
  title: string;
};
const products: ProductType[] = [
  { id: "1_milk", title: "Milk" },
  { id: "1_cheese", title: "Cheese" },
  { id: "1_meat", title: "Meat" },
];

export const productsRepository = {
  async findProducts(title: string | null): Promise<ProductType[]> {
    if (title) {
      let filteredProducts = products.filter(
        (p: ProductType) => p.title.indexOf(title) > -1
      );
      return filteredProducts;
    } else {
      return products;
    }
  },
  async getProductById(id: string): Promise<ProductType | null> {
    let product = products.find((item: ProductType) => item.id === id);
    if (product) {
      return product;
    } else {
      return null;
    }
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = { id: `${+new Date()}`, title };
    products.push(newProduct);
    return newProduct;
  },
  async updateProduct(id: string, title: string): Promise<boolean> {
    const product = products.find((item: ProductType) => item.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
  async deleteProduct(id: string): Promise<boolean> {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  removeAllData() {
    products.splice(0, products.length);
    if (products.length === 0) {
      return true;
    } else false;
  },
};
