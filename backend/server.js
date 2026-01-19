require("dotenv").config();
const Fastify = require("fastify");
const cors = require("@fastify/cors");
const sqlite3 = require("sqlite3").verbose();

console.log("Starting backend...");

const fastify = Fastify({ logger: true });

// Enable CORS for frontend
fastify.register(cors, {
  origin: "*",
});

// SQLite database setup
const db = new sqlite3.Database("movies.db", (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_input TEXT,
    recommended_movies TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API endpoint
fastify.post("/recommend", async (request, reply) => {
  const { user_input } = request.body;

  if (!user_input) {
    return reply.code(400).send({ error: "Input required" });
  }

  // 🔹 MOCK AI RESPONSE (STABLE & FAST)
  const movies =
    "Inception, Mad Max: Fury Road, The Dark Knight, Wonder Woman, John Wick";

  // Save to SQLite
  db.run(
    `INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)`,
    [user_input, movies]
  );

  // Send response to frontend
  reply.send({ movies });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Backend running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
