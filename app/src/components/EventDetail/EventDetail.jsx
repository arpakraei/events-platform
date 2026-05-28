import styles from "./EventDetail.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const [quantity, setQuantity] = useState(1);
  const [err, setError] = useState("");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { items, addToCart } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Can not fetch data");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (err) {
    return <p>{err}</p>;
  }
  if (loading) {
    return <p>Data is loading</p>;
  } else
    return (
      <main>
        <div className={styles.header}>
          <Link to="/events" className={styles.backLink}>
            ← Back to events
          </Link>
        </div>
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
                disabled={quantity === 1 || event.ticketsAvailable === 0}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(quantity + 1)}
                disabled={
                  quantity === event.ticketsAvailable ||
                  event.ticketsAvailable === 0
                }
              >
                +
              </button>
            </div>
            <button
              className={styles.addToCart}
              onClick={() =>
                addToCart({
                  id,
                  name: event.name,
                  price: event.price,
                  quantity,
                })
              }
              disabled={event.ticketsAvailable === 0}
            >
              Add to Cart
            </button>
          </div>
        </article>
      </main>
    );
}
