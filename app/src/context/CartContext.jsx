import { createContext, useState, useContext } from "react";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addToCart = ({ id, quantity }) => {
    setItems((prev) => [...prev, { id: id, quantity: quantity }]);
  };

  const updateCart = ({ id, quantity }) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <CartContext.Provider
      value={{ items, addToCart, updateCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
