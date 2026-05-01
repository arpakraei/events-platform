import styles from "./FilterBar.module.css";
export default function FilterBar({ filterCategory, setFilterCategory }) {
  return (
    <div className={styles.filterBar}>
      <label htmlFor="category-filter" className={styles.label}>
        Filter by Category
      </label>
      <select
        id="category-filter"
        className={styles.select}
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Conference">Conference</option>
        <option value="Workshop">Workshop</option>
        <option value="Hackathon">Workshop</option>
        <option value="Meetup">Meetup</option>
        <option value="Concert">Concert</option>
      </select>
    </div>
  );
}
