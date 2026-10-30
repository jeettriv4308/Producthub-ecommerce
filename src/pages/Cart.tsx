
import EmptyState from "../components/common/EmptyState";

export default function Cart() {
  return (
    <main className="container section">
      <span className="eyebrow">YOUR SHOPPING</span>
      <h1 className="section-heading">Shopping cart</h1>
      <p className="section-description">Review the products you want to buy.</p>

      <div style={{ marginTop: 28 }}>
        <EmptyState
          title="Your cart is empty"
          message="Your cart items and total will appear here when cart functionality is implemented."
        />
      </div>
    </main>
  );
}
