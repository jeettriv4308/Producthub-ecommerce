import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";
import EmptyState from "../components/common/EmptyState";

import {
  getProducts,
  searchProducts,
} from "../services/productService";

import type { Product } from "../types/product";
import "./Products.css";

const LIMIT = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "featured";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [search]);

  // Update URL parameters
  function updateParam(key: string, value: string) {
    const newParams = new URLSearchParams(searchParams);

    if (value && value !== "All" && value !== "featured") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (key !== "page") {
      newParams.delete("page");
    }

    setSearchParams(newParams, { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  // Fetch products
  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const skip = (currentPage - 1) * LIMIT;

        const result = debouncedSearch.trim()
          ? await searchProducts(
              debouncedSearch.trim(),
              LIMIT,
              skip
            )
          : await getProducts(LIMIT, skip);

        if (active) {
          setProducts(result.products);
          setTotal(result.total);
        }
      } catch (err) {
        if (active) {
          setProducts([]);
          setTotal(0);

          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      active = false;
    };
  }, [debouncedSearch, currentPage, retry]);

  // Memoized filtering and sorting
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        default:
          return 0;
      }
    });
  }, [products, category, minPrice, maxPrice, sort]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <main className="container section">
      <div className="products-header">
        <h1 className="section-heading">All Products</h1>
        <p className="section-description">
          Discover our collection of products.
        </p>
      </div>

      <div className="products-toolbar">
        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              updateParam("search", event.target.value)
            }
            aria-label="Search products"
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
        </div>

        <div className="filter-control">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) =>
              updateParam("category", event.target.value)
            }
          >
            <option value="All">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>

        <div className="filter-control">
          <span>Price</span>
          <input
            type="number"
            placeholder="Min"
            min="0"
            value={minPrice}
            onChange={(event) =>
              updateParam("minPrice", event.target.value)
            }
            aria-label="Minimum price"
          />
          <input
            type="number"
            placeholder="Max"
            min="0"
            value={maxPrice}
            onChange={(event) =>
              updateParam("maxPrice", event.target.value)
            }
            aria-label="Maximum price"
          />
        </div>

        <div className="filter-control">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) =>
              updateParam("sort", event.target.value)
            }
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <button
          type="button"
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <p className="results-summary">
        Showing {filteredProducts.length} products on this page
      </p>

      {loading && (
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {!loading && error && (
        <div className="products-error">
          <h2>Unable to load products</h2>
          <p>{error}</p>

          <button
            type="button"
            className="retry-button"
            onClick={() => setRetry((value) => value + 1)}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          title="No products found"
          message="Try changing your search or filters."
        />
      )}

      {!loading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) =>
            updateParam("page", String(page))
          }
        />
      )}
    </main>
  );
}
