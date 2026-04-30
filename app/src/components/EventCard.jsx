import styles from "./EventCard.module.css";

export default function EventCard({
  name,
  date,
  city,
  venue,
  category,
  price,
  ticketsAvailable,
  totalTickets,
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
      <div className={styles.price}>{price === 0 ? "Free" : `€${price}`}</div>
      <div className={styles.row}>
        <span
          className={
            ticketsAvailable === 0
              ? styles.statusSoldOut
              : styles.statusAvailable
          }
        >
          {ticketsAvailable === 0
            ? "Sold Out"
            : `${ticketsAvailable} tickets left`}
        </span>
      </div>
    </article>
  );
}
