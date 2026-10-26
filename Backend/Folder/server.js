
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Subscription = require("./models/Subscription");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Travel Website Backend is running!");
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    const existing = await Subscription.findOne({ email });

    if (existing) {
      return res.status(409).json({
        message: "This email is already subscribed."
      });
    }

    await Subscription.create({ email });

    res.status(201).json({
      message: "Thank you for subscribing!"
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Something went wrong. Please try again."
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
