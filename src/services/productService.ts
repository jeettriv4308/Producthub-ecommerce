
import type { Product, ProductsResponse } from "../types/product";

const API_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}?limit=12&skip=0`);

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  return response.json() as Promise<ProductsResponse>;
}

export async function searchProducts(
  query: string
): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}&limit=12`
  );

  if (!response.ok) {
    throw new Error("Unable to search products. Please try again.");
  }

  return response.json() as Promise<ProductsResponse>;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error("Unable to load this product.");
  }

  return response.json() as Promise<Product>;
}
