import "dotenv/config";
import knex from "./database_client.js";

const venues = [
  "Copenhagen Concert Hall",
  "BLOX",
  "Founders House",
  "Design Museum",
  "TechHub Copenhagen",
  "DR Koncerthuset",
  "Tivoli Congress Center",
  "Bella Center",
];
const cities = ["Copenhagen", "Aarhus", "Odense", "Aalborg"];
const categories = ["Conference", "Workshop", "Hackathon", "Meetup"];
const names = [
  "React Summit",
  "Vue.js Day",
  "Node.js Workshop",
  "CSS Masterclass",
  "TypeScript Deep Dive",
  "GraphQL Conference",
  "Docker for Developers",
  "AI & Machine Learning Meetup",
  "UX Design Sprint",
  "Agile Workshop",
  "DevOps Conference",
  "Python Bootcamp",
  "Web Security Seminar",
  "Open Source Hackathon",
  "Frontend Performance Workshop",
  "Backend Architecture Talk",
  "Cloud Native Conference",
  "Git Advanced Workshop",
  "Testing Best Practices",
  "Accessibility in Web Dev",
];

const events = Array.from({ length: 100 }, (_, i) => ({
  name: `${names[i % names.length]} ${2026 + Math.floor(i / names.length)}`,
  date: `2026-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
  time: `${String((i % 12) + 8).padStart(2, "0")}:00`,
  venue: venues[i % venues.length],
  city: cities[i % cities.length],
  description: `A great event about modern software development. Session ${i + 1} covering the latest trends and best practices.`,
  price: [0, 49, 79, 99, 149][i % 5],
  ticketsAvailable: [0, 10, 25, 50, 100][i % 5],
  totalTickets: [100, 50, 50, 100, 200][i % 5],
  category: categories[i % categories.length],
}));

await knex("events").del();
await knex("events").insert(events);
console.log("100 events inserted");
process.exit(0);
