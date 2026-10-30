
import { useEffect, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";
import EmptyState from "../components/common/EmptyState";
import { getProducts, searchProducts } from "../services/productService";
import type { Product } from "../types/product";
import "./Products.css";

export default function Products() {
 
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const result = search.trim()
          ? await searchProducts(search.trim())
          : await getProducts();

        if (active) {
          setProducts(result.products);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, search.trim() ? 350 : 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [search, retry]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        category === "All" || product.category === category
    )
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return a.id - b.id;
    });

  return (
    <main className="container section">
      <div className="products-heading">
        <div>
          <span className="eyebrow">THE COLLECTION</span>
          <h1 className="section-heading">All products</h1>
          <p className="section-description">
            Find something that fits your everyday.
          </p>
        </div>

        <span className="products-count">
          {loading ? "Loading..." : `${filteredProducts.length} products`}
        </span>
      </div>

      <div className="products-toolbar">
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search products by name..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCategory("All");
            }}
            aria-label="Search products by name"
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <label className="filter-control">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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

        <label className="filter-control">
          <span>Sort by</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      <div className="results-summary" aria-live="polite">
        {loading
          ? "Finding products..."
          : search.trim()
            ? `Search results for "${search.trim()}"`
            : "Explore our latest collection"}
      </div>

      {error ? (
        <div className="products-error" role="alert">
          <h2>Couldn't load products</h2>
          <p>{error}</p>
         <button
          type="button"
          className="retry-button"
          onClick={() => setRetry((value) => value + 1)}
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
          message="Try a different search term or select another category."
        />
      )}
    </main>
  );
}
