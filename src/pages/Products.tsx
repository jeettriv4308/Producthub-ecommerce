import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";

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

  // Debounced search (400ms)
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

  // Clear all filters
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
      {/* Products Header */}
      <div className="products-header">
        <h1 className="section-heading">All Products</h1>

        <p className="section-description">
          Discover our collection of products.
        </p>
      </div>

      
    {/* Search and Filters */}
    <div className="products-toolbar">

      {/* Search Box */}
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>

        <label
          htmlFor="product-search"
          className="sr-only"
        >
          Search products
        </label>

        <input
          id="product-search"
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) =>
            updateParam("search", event.target.value)
          }
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

      {/* Category Filter */}
      <div className="filter-control">
        <label htmlFor="product-category">
          Category
        </label>

        <select
          id="product-category"
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

      {/* Minimum Price */}
      <div className="filter-control">
        <label htmlFor="min-price">
          Minimum Price
        </label>

        <input
          id="min-price"
          type="number"
          placeholder="Min"
          min="0"
          value={minPrice}
          aria-label="Minimum price"
          onChange={(event) =>
            updateParam("minPrice", event.target.value)
          }
        />
      </div>

      {/* Maximum Price */}
      <div className="filter-control">
        <label htmlFor="max-price">
          Maximum Price
        </label>

        <input
          id="max-price"
          type="number"
          placeholder="Max"
          min="0"
          value={maxPrice}
          aria-label="Maximum price"
          onChange={(event) =>
            updateParam("maxPrice", event.target.value)
          }
        />
      </div>

      {/* Sorting */}
      <div className="filter-control">
        <label htmlFor="product-sort">
          Sort
        </label>

        <select
          id="product-sort"
          value={sort}
          aria-label="Sort products"
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

      {/* Clear Filters */}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
        aria-label="Clear all search and product filters"
      >
        Clear Filters
      </button>

    </div>


      {/* Results Summary */}
      <p
        className="results-summary"
        role="status"
        aria-live="polite"
      >
        Showing {filteredProducts.length} products on this page
      </p>

      {/* Loading State */}
      
      {loading && (
        <div
          className="products-loading"
          role="status"
          aria-live="polite"
        >
          <div
            className="loading-spinner"
            aria-hidden="true"
          ></div>

          <p>Loading products, please wait...</p>
        </div>
      )}


      {/* Error State */}
      {!loading && error && (
        <ErrorState
          title="Unable to load products"
          message={error}
          onRetry={() => setRetry((value) => value + 1)}
        />
      )}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          title="No products found"
          message="Try changing your search or filters."
        />
      )}

      {/* Pagination */}
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
