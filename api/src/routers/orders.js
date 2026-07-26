import knex from "../database_client.js";
import { requireAuth } from "../middleware/auth.js";
import express from "express";

const ordersRouter = express.Router();

ordersRouter.get("/", requireAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await knex("orders").select("*").where("user_id", userId);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});
ordersRouter.get("/:id", requireAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const order = await knex("orders")
      .select("*")
      .where({ id: id, user_id: userId })
      .first();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderDetails = await knex("order_details")
      .join("events", "order_details.event_id", "events.id")
      .select(
        "order_details.id",
        "order_details.order_id",
        "order_details.event_id",
        "order_details.amount",
        "events.name",
        "events.price",
      )
      .where("order_details.order_id", id);

    res.json(orderDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch order details" });
  }
});

ordersRouter.post("/", requireAuth, async (req, res) => {
  try {
    const { items } = req.body;
    const { userId } = req.user;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in cart" });
    }

    const [orderId] = await knex("orders").insert({
      user_id: userId,
    });

    const orderDetails = items.map((item) => ({
      order_id: orderId,
      event_id: item.id,
      amount: item.quantity,
    }));

    await knex("order_details").insert(orderDetails);

    for (const item of items) {
      const event = await knex("events")
        .select("ticketsAvailable")
        .where({ id: item.id })
        .first();

      if (!event) {
        return res.status(404).json({
          message: `Event ${item.id} not found`,
        });
      }

      if (event.ticketsAvailable < item.quantity) {
        return res.status(400).json({
          message: `Not enough tickets for event ${item.id}`,
        });
      }

      await knex("events")
        .where({ id: item.id })
        .decrement("ticketsAvailable", item.quantity);
    }

    res.status(201).json({
      message: "Order created",
      orderId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

export default ordersRouter;
