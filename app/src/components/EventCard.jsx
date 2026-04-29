import styles from "./EventCard.module.css";
import events from "../data/events.js";

/* const event = {
  name: "React Copenhagen Conference 2026",
  date: "2026-04-15",
  time: "09:00",
  venue: "Copenhagen Concert Hall",
  city: "Copenhagen",
  description:
    "The largest React conference in Scandinavia. Two tracks covering the latest in React 19, Server Components, and the evolving frontend ecosystem. Keynotes from core React team members and community leaders.",
  price: 149,
  category: "Conference",
}; */

export default function EventCard({
  name,
  date,
  city,
  venue,
  category,
  price,
}) {
  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Date</span>
          <span className={styles.value}>{date}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>City</span>
          <span className={styles.value}>{city}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Venue</span>
          <span className={styles.value}>{venue}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{category}</span>
        </div>
      </div>
      <div className={styles.price}>€{price}</div>
    </article>
  );
}
