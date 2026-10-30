
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">P.</span>
          <span>product<span>hub</span></span>
        </Link>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink to="/wishlist" onClick={closeMenu}>
            Wishlist
          </NavLink>
          <NavLink to="/cart" onClick={closeMenu}>
            Cart
          </NavLink>
          <Link to="/products" className="nav-cta" onClick={closeMenu}>
            Explore store ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
