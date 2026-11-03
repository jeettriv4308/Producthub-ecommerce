import { memo } from "react";
import type { Product } from "../../data/demoProducts";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default memo(ProductGrid);