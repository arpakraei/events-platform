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
};

export default function EventCard() {
  return (
    <div>
      <h3>{event.name}</h3>
      <div>Date {event.date}</div>
      <div>City {event.city}</div>
      <div>Venue {event.venue}</div>
      <div>Category {event.category}</div>
      <div>Price €{event.price}</div>
      <div>Description {event.description}</div>
    </div>
  );
}
