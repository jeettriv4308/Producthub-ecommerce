import { useState } from "react";
import "./ProductImage.css";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ProductImage({
  src,
  alt,
  className = "",
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`product-image-wrapper ${className}`}>
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="product-image-fallback"
          role="img"
          aria-label={`${alt} image unavailable`}
        >
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
}