import events from "../../data/events.js";
import EventCard from "../EventCard.jsx";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  return (
    <ul>
      {events.map((event) => {
        return (
          <li key={event.id}>
            <EventCard
              name={event.name}
              date={event.date}
              venue={event.venue}
              city={event.city}
              category={event.category}
              price={event.price === 0 ? "Free" : `${event.price}`}
            />
          </li>
        );
      })}
    </ul>
  );
}
