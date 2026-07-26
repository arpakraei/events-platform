import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import knex from "../database_client.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: hash the password using bcrypt
    const hasedPassword = await bcrypt.hash(password, 10);
    // TODO: insert email and hashed password into users table
    const [id] = await knex("users").insert([
      {
        email: email,
        password: hasedPassword,
      },
    ]);

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ accessToken: token, user: { id, email } });
    // TODO: return the new user and a token
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: find user in database by email
    const user = await knex("users").where({ email }).first();
    if (!user) return res.status(404).json({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  },
);
      res.json({
        accessToken: token,
        user: { id: user.id, email: user.email },
      });
    } else {
      res.status(400).json({ message: "wrong password" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // TODO: compare password with bcrypt
  // TODO: if wrong, return 401 error
  // TODO: return user and token
});

export default authRouter;
