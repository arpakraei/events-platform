import events from "../../data/events.js";
import EventCard from "../EventCard.jsx";
import FilterBar from "../FilterBar/FilterBar.jsx";
import { useState } from "react";
import style from "./EventList.module.css";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  const [filterCategory, setFilterCategory] = useState("All");
  const filteredEvents = events.filter((event) =>
    filterCategory === "All" ? true : event.category === filterCategory,
  );
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
