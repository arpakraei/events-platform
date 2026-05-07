import EventCard from "../EventCard.jsx";
import FilterBar from "../FilterBar/FilterBar.jsx";
import { useState, useEffect } from "react";
import style from "./EventList.module.css";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/events");
        if (!response.ok) {
          throw new Error("Failed To fetch data");
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
  }, []);

  const filteredEvents = events.filter((event) =>
    filterCategory === "All" ? true : event.category === filterCategory,
  );
  if (err) {
    return <p>{err}</p>;
  }
  if (loading) {
    return <p>Data is loading...</p>;
  } else
    return (
      <div>
        <div>
          <FilterBar
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </div>
        <div>
          {filteredEvents.length === 0 ? (
            <p>No events found for this category</p>
          ) : (
            <ul
              className={style.cards}
              style={{ "--numcards": filteredEvents.length }}
            >
              {filteredEvents.map((event, index) => (
                <li key={event.id} style={{ "--index": index + 1 }}>
                  <EventCard {...event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
}
