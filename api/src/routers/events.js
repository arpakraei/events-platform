import express from "express";
import knex from "../database_client.js";

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res) => {
  const { search, page = 1, limit = 6 } = req.query;
  const offset = (page - 1) * limit;

  let query = knex("events");

  if (search) {
    query = query.where("name", "like", `%${search}%`);
  }

  const events = await query.limit(limit).offset(offset);
  res.json(events);
});

eventsRouter.get("/:id", async (req, res) => {
  const event = await knex("events").where({ id: req.params.id }).first();
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

export default eventsRouter;
