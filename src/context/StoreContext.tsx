import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: number[];
  toasts: Toast[];
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateCartQty: (productId: number, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  cartTotal: number;
  cartCount: number;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("jugbee-cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("jugbee-wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => { localStorage.setItem("jugbee-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("jugbee-wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToCart = useCallback((product: Product, size: string, color: string, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { product, quantity: qty, size, color }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((productId: number, size: string, color: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size && i.color === color)));
  }, []);

  const updateCartQty = useCallback((productId: number, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev => prev.map(i =>
      i.product.id === productId && i.size === size && i.color === color
        ? { ...i, quantity: qty }
        : i
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist(prev => {
      const isIn = prev.includes(productId);
      if (isIn) {
        showToast("Removed from wishlist", "info");
        return prev.filter(id => id !== productId);
      }
      showToast("Added to wishlist! ❤️");
      return [...prev, productId];
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: number) => wishlist.includes(productId), [wishlist]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, toasts,
      addToCart, removeFromCart, updateCartQty, clearCart,
      toggleWishlist, isInWishlist,
      cartTotal, cartCount,
      showToast, removeToast,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
