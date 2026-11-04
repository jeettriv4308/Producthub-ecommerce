import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { ShopProvider } from "./context/ShopContext";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ShopProvider>
      <ErrorBoundary>
        <Suspense
          fallback={
            <main className="container section">
              <p
                className="section-description"
                role="status"
                aria-live="polite"
              >
                Loading page...
              </p>
            </main>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/products/:id"
                element={<ProductDetails />}
              />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ShopProvider>
  );
}
