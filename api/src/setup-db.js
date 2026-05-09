import "dotenv/config";
import knex from "./database_client.js";

await knex.schema.createTableIfNotExists("events", (table) => {
  table.increments("id");
  table.string("name").notNullable();
  table.string("date").notNullable();
  table.string("time").notNullable();
  table.string("venue").notNullable();
  table.string("city").notNullable();
  table.text("description");
  table.integer("price").defaultTo(0);
  table.integer("ticketsAvailable").defaultTo(0);
  table.integer("totalTickets").defaultTo(0);
  table.string("category");
});
await knex.schema.createTableIfNotExists("users", (table) => {
  table.increments("id");
  table.string("name").notNullable();
  table.string("email").notNullable();
  table.string("password").notNullable();
});

await knex("events").insert([
  {
    name: "React Copenhagen Conference 2026",
    date: "2026-04-15",
    time: "09:00",
    venue: "Copenhagen Concert Hall",
    city: "Copenhagen",
    description: "The largest React conference in Scandinavia.",
    price: 149,
    ticketsAvailable: 0,
    totalTickets: 800,
    category: "Conference",
  },
  {
    name: "Hackathon: Build with AI",
    date: "2026-04-25",
    time: "09:00",
    venue: "BLOX",
    city: "Copenhagen",
    description:
      "A 24-hour hackathon where teams of 2–4 build something real using AI APIs.",
    price: 0,
    ticketsAvailable: 60,
    totalTickets: 150,
    category: "Hackathon",
  },
  {
    name: "JavaScript: Modern Patterns Workshop",
    date: "2026-05-03",
    time: "10:00",
    venue: "Founders House",
    city: "Copenhagen",
    description:
      "A hands-on full-day workshop covering modern JavaScript patterns.",
    price: 79,
    ticketsAvailable: 12,
    totalTickets: 30,
    category: "Workshop",
  },
  {
    name: "UX Design for Developers",
    date: "2026-05-10",
    time: "13:00",
    venue: "Design Museum",
    city: "Copenhagen",
    description:
      "Learn the fundamentals of UX design from a developer perspective.",
    price: 49,
    ticketsAvailable: 25,
    totalTickets: 50,
    category: "Workshop",
  },
  {
    name: "Node.js Performance Meetup",
    date: "2026-05-20",
    time: "18:00",
    venue: "TechHub Copenhagen",
    city: "Copenhagen",
    description:
      "An evening meetup focused on Node.js performance optimisation.",
    price: 0,
    ticketsAvailable: 40,
    totalTickets: 80,
    category: "Meetup",
  },
]);

console.log("Database setup complete");
process.exit(0);
