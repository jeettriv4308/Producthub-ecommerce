
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import EmptyState from "../components/common/EmptyState";

import {
  getProducts,
  searchProducts,
} from "../services/productService";

import type { Product } from "../types/product";

import "./Products.css";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filter values from the URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "featured";
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Product data
  const [products, setProducts] = useState<Product[]>([]);

  // Loading, error and retry states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Update URL parameters
  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value.trim() === "" || value === "All" || value === "featured") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams, { replace: true });
  };

  // Debounce search input by 350ms
useEffect(() => {
  const timer = window.setTimeout(() => {
    setDebouncedSearch(search);
  }, 400);

  return () => {
    window.clearTimeout(timer);
  };
}, [search]);

  // Fetch products from DummyJSON API
useEffect(() => {
  let active = true;

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const result = debouncedSearch.trim()
        ? await searchProducts(debouncedSearch.trim())
        : await getProducts();

      if (active) {
        setProducts(result.products);
      }
    } catch (err) {
      if (active) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );

        setProducts([]);
      }
    } finally {
      if (active) {
        setLoading(false);
      }
    }
  }

  loadProducts();

  return () => {
    active = false;
  };
}, [debouncedSearch, retry]);

  // Get categories from fetched products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Apply category and price filters, then sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesMinPrice =
        minPrice === "" ||
        product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      return (
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return a.price - b.price;
      }

      if (sort === "price-high") {
        return b.price - a.price;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      return a.id - b.id;
    });

  // Clear all search and filter parameters
  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <main className="container section">

      {/* Page heading */}
      <div className="products-heading">
        <div>
          <span className="eyebrow">THE COLLECTION</span>

          <h1 className="section-heading">
            All products
          </h1>

          <p className="section-description">
            Find something that fits your everyday.
          </p>
        </div>

        <span className="products-count">
          {loading
            ? "Loading..."
            : `${filteredProducts.length} products`}
        </span>
      </div>

      {/* Search and filter toolbar */}
      <div className="products-toolbar">

        {/* Search */}
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search products by name..."
            value={search}
            onChange={(event) =>
              updateParam("search", event.target.value)
            }
            aria-label="Search products by name"
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => updateParam("search", "")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        {/* Minimum price */}
        <label className="filter-control">
          <span>Min Price ($)</span>

          <input
            type="number"
            min="0"
            placeholder="Minimum"
            value={minPrice}
            onChange={(event) =>
              updateParam("minPrice", event.target.value)
            }
          />
        </label>

        {/* Maximum price */}
        <label className="filter-control">
          <span>Max Price ($)</span>

          <input
            type="number"
            min="0"
            placeholder="Maximum"
            value={maxPrice}
            onChange={(event) =>
              updateParam("maxPrice", event.target.value)
            }
          />
        </label>

        {/* Category */}
        <label className="filter-control">
          <span>Category</span>

          <select
            value={category}
            onChange={(event) =>
              updateParam("category", event.target.value)
            }
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All"
                  ? "All categories"
                  : item.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </label>

        {/* Sorting */}
        <label className="filter-control">
          <span>Sort by</span>

          <select
            value={sort}
            onChange={(event) =>
              updateParam("sort", event.target.value)
            }
          >
            <option value="featured">Featured</option>
            <option value="price-low">
              Price: Low to high
            </option>
            <option value="price-high">
              Price: High to low
            </option>
            <option value="rating">
              Top rated
            </option>
          </select>
        </label>

      </div>

      {/* Results summary */}
      <div className="results-summary" aria-live="polite">
        {loading
          ? "Finding products..."
          : search.trim()
          ? `Search results for "${search.trim()}"`
          : "Explore our latest collection"}
      </div>

      {/* Product display */}
      {error ? (
        <div className="products-error" role="alert">
          <h2>Couldn't load products</h2>

          <p>{error}</p>

          <button
            type="button"
            className="retry-button"
            onClick={() =>
              setRetry((value) => value + 1)
            }
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="products-loading" role="status">
          <span className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <EmptyState
          title="No products found"
          message="Try a different search term or adjust your filters."
        />
      )}

      {/* Clear filters */}
      {!loading &&
        (search || category !== "All" || minPrice || maxPrice || sort !== "featured") && (
          <button
            type="button"
            className="retry-button"
            onClick={clearFilters}
          >
            Clear all filters
          </button>
        )}

    </main>
  );
}
