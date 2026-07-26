import "dotenv/config";
import knex from "./database_client.js";
const users = await knex("users").select();
console.log(users);
process.exit(0);
