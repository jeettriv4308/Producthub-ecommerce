interface ProductSkeletonProps {
  count?: number;
}

export default function ProductSkeleton({ count = 4 }: ProductSkeletonProps) {
  return (
    <div className="product-grid" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-image" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line skeleton-short" />
          <div className="skeleton skeleton-button" />
        </div>
      ))}
    </div>
  );
}
