
import type {
  Product,
  ProductsResponse,
} from "../types/product";

const API_URL = "https://dummyjson.com/products";

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed. Status: ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

export async function getProducts(
  limit: number = 12,
  skip: number = 0
): Promise<ProductsResponse> {
  return fetchData<ProductsResponse>(
    `${API_URL}?limit=${limit}&skip=${skip}`
  );
}

export async function searchProducts(
  query: string,
  limit: number = 12,
  skip: number = 0
): Promise<ProductsResponse> {
  return fetchData<ProductsResponse>(
    `${API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );
}

export async function getProductById(
  id: string
): Promise<Product> {
  return fetchData<Product>(
    `${API_URL}/${encodeURIComponent(id)}`
  );
}
