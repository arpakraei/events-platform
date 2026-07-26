import "dotenv/config";
import knex from "./database_client.js";

await knex.schema.createTableIfNotExists("orders", (table) => {
  table.increments("id");
  table.integer("user_id").notNullable();
  table.timestamp("createdAt").defaultTo(knex.fn.now());
  table.text("description");
});

await knex.schema.createTableIfNotExists("order_details", (table) => {
  table.increments("id");
  table.integer("order_id").notNullable();
  table.integer("event_id").notNullable();
  table.integer("amount").notNullable().defaultTo(1);
});

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

console.log("Database setup complete");
process.exit(0);
