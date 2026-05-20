import styles from "./CartPage.module.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CartPage() {
  const { items, updateCart, removeFromCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const isEmpty = items.length === 0;

  async function registerOrder() {
    const response = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();

    console.log(data);
  }
  if (isEmpty) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>Your Cart</h2>
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Your Cart</h2>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.itemName}>{item.name}</span>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={() =>
                  updateCart({ id: item.id, quantity: item.quantity - 1 })
                }
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span className={styles.itemQuantity}>{item.quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() =>
                  updateCart({ id: item.id, quantity: item.quantity + 1 })
                }
              >
                +
              </button>
            </div>
            <span className={styles.itemPrice}>
              €{item.quantity * item.price}
            </span>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>€{total}</span>
      </div>
      <button
        onClick={() => (!user ? navigate("/login") : registerOrder())}
        className={styles.checkoutButton}
      >
        Checkout
      </button>
    </div>
  );
}
