
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/demoProducts";
import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
          <img
            className="product-image"
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />
        </Link>

        <button
          className={`wishlist-button ${isFavorite ? "is-favorite" : ""}`}
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        {product.stock > 0 && (
          <span className="stock-badge">In stock</span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="product-rating">
          <span>★</span> {product.rating.toFixed(1)}
          <span className="rating-label">· Available now</span>
        </div>

        <div className="product-card-bottom">
          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <Link to={`/products/${product.id}`} className="view-product-link">
            View details <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
