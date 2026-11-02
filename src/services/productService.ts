
import type { Product, ProductsResponse } from "../types/product";

const API_URL = "https://dummyjson.com/products";

// Fetch all products with pagination
export async function getProducts(
  limit: number = 12,
  skip: number = 0
): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  return response.json() as Promise<ProductsResponse>;
}

// Search products with pagination
export async function searchProducts(
  query: string,
  limit: number = 12,
  skip: number = 0
): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Unable to search products. Please try again.");
  }

  return response.json() as Promise<ProductsResponse>;
}

// Fetch individual product details
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error("Unable to load this product.");
  }

  return response.json() as Promise<Product>;
}
