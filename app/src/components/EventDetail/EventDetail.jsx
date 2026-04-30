import styles from "./EventDetail.module.css";
import { useState } from "react";

export default function EventDetail({ event }) {
  const [quantity, setQuantity] = useState(0);
  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{event.name}</h2>
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Date</span>
          <span className={styles.value}>{event.date}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>{event.time}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>City</span>
          <span className={styles.value}>{event.city}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Venue</span>
          <span className={styles.value}>{event.venue}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{event.category}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>€{event.price}</span>
        <span className={styles.status}>{event.status}</span>
      </div>
      <div className={styles.descriptionSection}>
        <span className={styles.descriptionLabel}>Description</span>
        <p className={styles.description}>{event.description}</p>
      </div>
      <div className={styles.quantitySelector}>
        <span className={styles.quantityLabel}>Quantity</span>
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity === event.ticketsAvailable}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
