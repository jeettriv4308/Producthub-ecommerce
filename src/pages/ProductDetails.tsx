
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import { useShop } from "../context/ShopContext";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      if (!id || !/^\d+$/.test(id)) {
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      try {
        const result = await getProductById(id);
        if (active) setProduct(result);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load product."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="container section">
        <p className="section-description">Loading product details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container section">
        <EmptyState
          title="Product unavailable"
          message={error || "We couldn't find this product."}
        />
        <p>
          <Link to="/products">← Back to products</Link>
        </p>
      </main>
    );
  }

  const isFavorite = isInWishlist(product.id);

  return (
    <main className="container section">
      <Link to="/products" className="back-link">
        ← Back to products
      </Link>

      <div className="details-layout">
        <div className="details-image">
          <img
              src={product.thumbnail}
              alt={product.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
          />
        </div>

        <div className="details-content">
          <span className="eyebrow">{product.category}</span>

          <h1 className="section-heading">{product.title}</h1>

          {product.brand && (
            <p className="details-brand">{product.brand}</p>
          )}

          <p className="details-rating">
            ★ {product.rating.toFixed(1)} / 5
          </p>

          <p className="section-description">{product.description}</p>

          <h2 className="details-price">
            ${product.price.toFixed(2)}
          </h2>

          {product.discountPercentage !== undefined && (
            <p className="details-discount">
              {product.discountPercentage.toFixed(1)}% discount
            </p>
          )}

          <p className="details-stock">
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </p>

          <div className="details-actions">
            <button
              type="button"
              className="details-cart-btn"
              disabled={product.stock <= 0}
              onClick={() => addToCart(product)}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              type="button"
              className="details-wishlist-btn"
              onClick={() => toggleWishlist(product)}
            >
              {isFavorite ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
