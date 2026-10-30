
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
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
        <p><Link to="/products">← Back to products</Link></p>
      </main>
    );
  }

  return (
    <main className="container section">
      <p><Link to="/products">← Back to products</Link></p>

      <div className="details-layout">
        <img src={product.thumbnail} alt={product.title} />

        <div>
          <span className="eyebrow">{product.category}</span>
          <h1 className="section-heading">{product.title}</h1>
          {product.brand && <p>{product.brand}</p>}
          <p className="details-rating">★ {product.rating.toFixed(1)} rating</p>
          <p className="section-description">{product.description}</p>
          <h2>${product.price.toFixed(2)}</h2>
          <p>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
        </div>
      </div>
    </main>
  );
}
