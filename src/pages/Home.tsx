
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import ErrorState from "../components/common/ErrorState";

import { getProducts } from "../services/productService";
import type { Product } from "../types/product";

import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFeaturedProducts() {
      try {
        setLoading(true);
        setError("");

        const result = await getProducts(4, 0);

        if (active) {
          setProducts(result.products);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load featured products."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadFeaturedProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="eyebrow">THE NEW WAY TO SHOP</span>

            <h1>
              Find your next
              <br />
              <span>favorite thing.</span>
            </h1>

            <p>
              Discover everyday essentials, thoughtful designs, and products
              worth bringing home.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="primary-button">
                Explore products <span>↗</span>
              </Link>

              <a href="#featured" className="secondary-button">
                Discover more
              </a>
            </div>

            <div className="hero-note">
              <span>✦</span> A simpler way to shop for everyday life.
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Featured product illustration"
          >
            <div className="hero-circle">
              <div className="hero-product">
                <span className="hero-product-icon">P.</span>
                <span>PRODUCTHUB</span>
                <strong>NOW SHOP IS</strong>
                <strong>ON YOUR DEVICE.</strong>
              </div>
            </div>

            <div className="hero-floating hero-floating-top">
              <span>✦</span> Curated essentials
            </div>

            <div className="hero-floating hero-floating-bottom">
              <strong>All</strong>Collection
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section
        className="container benefits-grid"
        aria-label="Store highlights"
      >
        <div className="benefit">
          <span className="benefit-icon">✳</span>
          <div>
            <strong>Thoughtful selection</strong>
            <p>Everyday products in one place</p>
          </div>
        </div>

        <div className="benefit">
          <span className="benefit-icon">↗</span>
          <div>
            <strong>Easy discovery</strong>
            <p>Browse products without the clutter</p>
          </div>
        </div>

        <div className="benefit">
          <span className="benefit-icon">◇</span>
          <div>
            <strong>Simple experience</strong>
            <p>A clean and responsive storefront</p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container section" id="featured">
        <div className="section-top">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>

            <h2 className="section-heading">
              Featured products
            </h2>

            <p className="section-description">
              A preview of what you can discover at ProductHub.
            </p>
          </div>

          <Link to="/products" className="text-link">
            View all products ↗
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            className="products-loading"
            role="status"
            aria-live="polite"
          >
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>Loading featured products...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <ErrorState
            title="Unable to load featured products"
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* API Products */}
        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </section>
    </>
  );
}
