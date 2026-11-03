
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Wishlist.css";

export default function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
  } = useShop();

  return (
    <main className="container section wishlist-page">
      <span className="eyebrow">YOUR COLLECTION</span>

      <h1 className="section-heading">My Wishlist</h1>

      <p className="section-description">
        Products you want to save for later.
      </p>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favourite products and find them here anytime.</p>

          <Link to="/products" className="wishlist-shop-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          <div className="wishlist-heading-row">
            <h2>Saved Products ({wishlist.length})</h2>
          </div>

          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <article className="wishlist-card" key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="wishlist-image-link"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="wishlist-image"
                  />
                </Link>

                <div className="wishlist-card-info">
                  <span className="wishlist-category">
                    {product.category}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-product-title"
                  >
                    {product.title}
                  </Link>

                  <p className="wishlist-price">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="wishlist-add-btn"
                    disabled={product.stock <= 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>

                  <button
                    type="button"
                    className="wishlist-remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    ♥ Remove from Wishlist
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
