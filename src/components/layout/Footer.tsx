
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">P.</span>
          <span>product<span>hub</span></span>
        </Link>

        <p>Discover better everyday essentials.</p>

        <span className="footer-copy">
          © {new Date().getFullYear()} ProductHub · Student project
        </span>
      </div>
    </footer>
  );
}
