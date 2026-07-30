/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CommerceContext = createContext(null);

export function CommerceProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("customerUser")); } catch { return null; }
  });
  const [cart, setCart] = useState({ items: [], subTotal: 0 });
  const [wishlist, setWishlist] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const refreshCommerce = useCallback(async () => {
    if (!localStorage.getItem("customerToken")) {
      setCart({ items: [], subTotal: 0 });
      setWishlist({ items: [] });
      return;
    }
    setLoading(true);
    try {
      const [cartResponse, wishlistResponse] = await Promise.all([
        axiosInstance.get("/cart"),
        axiosInstance.get("/wishlist"),
      ]);
      setCart(cartResponse.data.data);
      setWishlist(wishlistResponse.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // The asynchronous request owns its loading lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCommerce().catch(() => {});
  }, [refreshCommerce]);

  const authenticate = (payload) => {
    localStorage.setItem("customerToken", payload.token);
    localStorage.setItem("customerUser", JSON.stringify(payload.data));
    setUser(payload.data);
    setTimeout(() => refreshCommerce().catch(() => {}), 0);
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");
    setUser(null);
    setCart({ items: [], subTotal: 0 });
    setWishlist({ items: [] });
  };

  const requireAuth = () => {
    if (!user) throw new Error("Please log in to continue.");
  };

  const addToCart = async (product, quantity = 1, size = "", color = "") => {
    requireAuth();
    const response = await axiosInstance.post("/cart/items", {
      productId: product._id, quantity, size, color,
    });
    setCart(response.data.data);
    return response.data;
  };
  const updateCart = async (productId, quantity) => {
    const response = await axiosInstance.put(`/cart/items/${productId}`, { quantity });
    setCart(response.data.data);
  };
  const removeFromCart = async (productId) => {
    const response = await axiosInstance.delete(`/cart/items/${productId}`);
    setCart(response.data.data);
  };
  const addToWishlist = async (product) => {
    requireAuth();
    const response = await axiosInstance.post("/wishlist/items", { productId: product._id });
    setWishlist(response.data.data);
    return response.data;
  };
  const removeFromWishlist = async (productId) => {
    const response = await axiosInstance.delete(`/wishlist/items/${productId}`);
    setWishlist(response.data.data);
  };

  const value = {
    user, cart, wishlist, loading, authenticate, logout, refreshCommerce,
    addToCart, updateCart, removeFromCart, addToWishlist, removeFromWishlist,
  };

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export const useCommerce = () => useContext(CommerceContext);
