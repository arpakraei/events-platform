import { createContext, useState, useContext, useEffect } from "react";
const CartContext = createContext(null);
const CART_STORAGE_KEY = "eventStartupCart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!savedCart) return [];
      return JSON.parse(savedCart);
    } catch (err) {
      return [];
    }
  });
  useEffect(() => {
    //console.log("Cart State", items);
    //console.log("Saved cart", localStorage.getItem(CART_STORAGE_KEY));
    if (items.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  const addToCart = ({ id, quantity, name, price }) => {
    setItems((prev) => [
      ...prev,
      { id: id, name: name, price: price, quantity: quantity },
    ]);
  };

  const updateCart = ({ id, quantity }) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  function clearCart() {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
