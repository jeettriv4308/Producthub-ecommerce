
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
    usePageTitle("Page Not Found");
  return (
    <main className="container section">
      <EmptyState
        title="Page not found"
        message="The page you are looking for doesn't exist."
      />
      <p style={{ textAlign: "center", marginTop: 24 }}>
        <Link to="/" className="text-link">Return home ↗</Link>
      </p>
    </main>
  );
}
