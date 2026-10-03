require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const habitRoutes = require("./routes/habits");
const goalRoutes = require("./routes/goals");
const expenseRoutes = require("./routes/expenses");
const journalRoutes = require("./routes/journal");
const focusRoutes = require("./routes/focus");
const analyticsRoutes = require("./routes/analytics");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://internship2026-weld.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman / server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => res.json({ app: "DailyRoutine Pro", status: "ok" }));
app.get("/api/health", (req, res) => res.json({ status: "healthy" }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in .env");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

start();
