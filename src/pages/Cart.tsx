
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Cart.css";

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useShop();

  return (
    <main className="container section cart-page">
      <span className="eyebrow">YOUR SHOPPING</span>
      <h1 className="section-heading">Shopping Cart</h1>
      <p className="section-description">
        Review the products you want to buy.
      </p>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="cart-shop-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-heading-row">
              <h2>Your Items ({cartCount})</h2>

              <button
                type="button"
                className="cart-clear-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.product.id}>
                <Link to={`/products/${item.product.id}`}>
                  <img
                    className="cart-item-image"
                    src={item.product.thumbnail}
                    alt={item.product.title}
                  />
                </Link>

                <div className="cart-item-info">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="cart-item-title"
                  >
                    {item.product.title}
                  </Link>

                  <p className="cart-item-category">
                    {item.product.category}
                  </p>

                  <p className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={item.quantity >= item.product.stock}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="cart-item-subtotal">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </strong>
              </article>
            ))}

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="checkout-btn"
              disabled
              title="Checkout will be implemented in a future phase."
            >
              Checkout (Coming Soon)
            </button>

            <p className="checkout-note">
              Secure checkout functionality will be added in a future update.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
