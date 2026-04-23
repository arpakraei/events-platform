import styles from "./EventDetail.module.css";

const event = {
  name: "React Copenhagen Conference 2026",
  date: "2026-04-15",
  time: "09:00",
  venue: "Copenhagen Concert Hall",
  city: "Copenhagen",
  description:
    "The largest React conference in Scandinavia. Two tracks covering the latest in React 19, Server Components, and the evolving frontend ecosystem. Keynotes from core React team members and community leaders.",
  price: 149,
  category: "Conference",
  status: "Sold out",
};

export default function EventDetail() {
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
    </article>
  );
}
