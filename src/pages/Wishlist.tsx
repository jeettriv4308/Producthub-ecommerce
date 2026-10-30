
import EmptyState from "../components/common/EmptyState";

export default function Wishlist() {
  return (
    <main className="container section">
      <span className="eyebrow">YOUR COLLECTION</span>
      <h1 className="section-heading">Wishlist</h1>
      <p className="section-description">Products you want to save for later.</p>

      <div style={{ marginTop: 28 }}>
        <EmptyState
          title="Your wishlist is empty"
          message="Your saved products will appear here once wishlist storage is implemented."
        />
      </div>
    </main>
  );
}
