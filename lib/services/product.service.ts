import products from "../data/products.json";

export type Product = (typeof products)[number];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
