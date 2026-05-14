import styles from "./CartPage.module.css";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { items } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const isEmpty = items.length === 0;

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
            <span className={styles.itemQuantity}>x{item.quantity}</span>
            <span className={styles.itemPrice}>
              €{item.quantity * item.price}
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>€{total}</span>
      </div>
      <button className={styles.checkoutButton}>Checkout</button>
    </div>
  );
}
