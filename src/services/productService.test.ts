
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from "vitest";

import {
  getProducts,
  searchProducts,
  getProductById,
} from "./productService";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Product Service", () => {
  it("fetches products successfully", async () => {
    const mockData = {
      products: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
        },
      ],
      total: 1,
      skip: 0,
      limit: 12,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await getProducts();

    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products?limit=12&skip=0"
    );
  });

  it("searches products successfully", async () => {
    const mockData = {
      products: [],
      total: 0,
      skip: 0,
      limit: 12,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await searchProducts("phone");

    expect(result).toEqual(mockData);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products/search?q=phone&limit=12&skip=0"
    );
  });

  it("fetches a product by ID", async () => {
    const mockProduct = {
      id: 1,
      title: "Test Product",
      price: 100,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProduct),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await getProductById("1");

    expect(result).toEqual(mockProduct);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products/1"
    );
  });

  it("throws an error when the API request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      getProducts()
    ).rejects.toThrow("Request failed. Status: 500");
  });

  it("handles network errors", async () => {
    const fetchMock = vi.fn().mockRejectedValue(
      new Error("Network error")
    );

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      getProducts()
    ).rejects.toThrow("Network error");
  });
});
