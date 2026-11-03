
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

type CartItem = {
  product: Product;
  quantity: number;
};

type ShopContextType = {
  cart: CartItem[];
  wishlist: Product[];
  cartCount: number;
  cartTotal: number;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
};

const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

const CART_KEY = "producthub-cart";
const WISHLIST_KEY = "producthub-wishlist";

function getSavedData<T>(key: string, fallback: T): T {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? (JSON.parse(savedData) as T) : fallback;
  } catch {
    return fallback;
  }
}

type ShopProviderProps = {
  children: ReactNode;
};

export function ShopProvider({ children }: ShopProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    getSavedData<CartItem[]>(CART_KEY, [])
  );

  const [wishlist, setWishlist] = useState<Product[]>(() =>
    getSavedData<Product[]>(WISHLIST_KEY, [])
  );

  // Save cart and wishlist
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Add product to cart
  function addToCart(product: Product) {
    if (product.stock <= 0) return;

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );
      }

      return [...previousCart, { product, quantity: 1 }];
    });
  }

  // Remove product from cart
  function removeFromCart(productId: number) {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  // Update product quantity
  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock),
            }
          : item
      )
    );
  }

  // Clear entire cart
  function clearCart() {
    setCart([]);
  }

  // Add product to wishlist
  function addToWishlist(product: Product) {
    setWishlist((previousWishlist) => {
      const alreadyExists = previousWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) return previousWishlist;

      return [...previousWishlist, product];
    });
  }

  // Remove product from wishlist
  function removeFromWishlist(productId: number) {
    setWishlist((previousWishlist) =>
      previousWishlist.filter(
        (product) => product.id !== productId
      )
    );
  }

  // Toggle wishlist
  function toggleWishlist(product: Product) {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  // Check wishlist status
  function isInWishlist(productId: number) {
    return wishlist.some(
      (product) => product.id === productId
    );
  }

  // Calculate cart item count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// Custom hook
export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}
