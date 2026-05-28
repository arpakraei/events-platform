import EventCard from "../EventCard.jsx";
import FilterBar from "../FilterBar/FilterBar.jsx";
import { useState, useEffect } from "react";
import style from "./EventList.module.css";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [deboundSearch, setDeboundSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  //serch bar

  const url = `${API_URL}/api/events?search=${deboundSearch}`;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Can not fetch data");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // filter
  const filteredEvents = events.filter((event) =>
    filterCategory === "All" ? true : event.category === filterCategory,
  );

  // view

  return (
    <main className={style.page}>
      <div>
        <div className={style.searchBar}>
          <label htmlFor="search" className={style.label}>
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.input}
            placeholder="Search events..."
          />
        </div>
        <div>
          <FilterBar
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </div>
        <div>
          {loading ? (
            <p>Data is loading...</p>
          ) : err ? (
            <p>{err}</p>
          ) : filteredEvents.length === 0 ? (
            <p>No events found</p>
          ) : (
            <ul
              className={style.cards}
              style={{ "--numcards": filteredEvents.length }}
            >
              {filteredEvents.map((event, index) => (
                <li key={event.id}>
                  <EventCard {...event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
