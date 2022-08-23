const products = [
  { id: "1_milk", title: "Milk" },
  { id: "1_cheese", title: "Cheese" },
  { id: "1_meat", title: "Meat" },
];

export const productsRepository = {
  findProducts(title: string | null) {
    if (title) {
      let filteredProducts = products.filter(
        (p: { id: string; title: string }) => p.title.indexOf(title) > -1
      );
      return filteredProducts;
    } else {
      return products;
    }
  },
  getProductById(id: string) {
    const product = products.find(
      (item: { id: string; title: string }) => item.id === id
    );
    return product;
  },
  createProduct(title: string) {
    const newProduct = { id: `${+new Date()}`, title };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct(id: string, title: string) {
    const product = products.find(
      (item: { id: string; title: string }) => item.id === id
    );
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
  deleteProduct(id: string) {
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
