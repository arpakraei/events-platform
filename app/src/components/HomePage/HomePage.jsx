// Feel free to replace the content of this component with your own
import EventCard from "../EventCard.jsx";
import events from "../../data/events.js";
import EventDetail from "../EventDetail/EventDetail.jsx";
function HomePage() {
  return <EventDetail event={events[0]} />;
}

export default HomePage;
