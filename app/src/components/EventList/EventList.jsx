import events from "../../data/events.js";
import EventCard from "../EventCard.jsx";
import FilterBar from "../FilterBar/FilterBar.jsx";
import { useState } from "react";

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
        <ul>
          {filteredEvents.map((event) => {
            return (
              <li key={event.id}>
                <EventCard {...event} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
