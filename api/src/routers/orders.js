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
ordersRouter.post("/", requireAuth, async (req, res) => {
  try {
    const { items } = req.body;
    const { userId } = req.user;
    const [orderId] = await knex("orders").insert({ user_id: userId });
    const orderDetails = items.map((item) => ({
      order_id: orderId,
      event_id: item.id,
      amount: item.quantity,
    }));
    await knex("order_details").insert(orderDetails);
    res.status(201).json({ message: "Order created", orderId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to fetch orders" });
  }
});

export default ordersRouter;
