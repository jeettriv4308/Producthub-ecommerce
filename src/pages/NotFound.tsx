
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import "./NotFound.css";

export default function NotFound() {
  usePageTitle("Page Not Found");

  return (
    <main className="not-found">
      <div className="not-found-content">
        <div className="error-code">
          <span>4</span>
          <div className="error-circle">
            <span>0</span>
          </div>
          <span>4</span>
        </div>

        <span className="error-label">ERROR 404</span>

        <h1>Oops! Page not found.</h1>

        <p>
          The page you're looking for doesn't exist or may have
          been moved. Let's get you back on track.
        </p>

        <div className="error-actions">
          <Link to="/" className="error-home-btn">
            Back to Home
            <span>→</span>
          </Link>

          <Link to="/products" className="error-products-btn">
            Explore Products
          </Link>
        </div>

        <div className="error-footer">
          <span>PRODUCTHUB</span>
          <span>Something missing? Let's find your next favourite product.</span>
        </div>
      </div>
    </main>
  );
}

