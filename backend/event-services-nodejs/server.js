const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");

const User = require("./models/User");
const Event = require("./models/Event");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// EVENT ROUTES 
app.post("/events", async (req, res) => {
  const { name, date, venue, status } = req.body;

  if (!name || !date || !venue || !status) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const formattedDate = new Date(date);
    const newEvent = new Event({ name, date: formattedDate, venue, status });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/upcomingevents", async (req, res) => {
  try {
    const events = await Event.find({ status: "Scheduled" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (deletedEvent) {
      res.json({ message: "Event deleted successfully!" });
    } else {
      res.status(404).json({ error: "Event not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  VENUE ROUTES
const Venue = mongoose.model("Venue", new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number
}));

app.get("/api/venues", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/venues/count", async (req, res) => {
  try {
    const count = await Venue.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/venues", async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    await newVenue.save();
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/venues/:id", async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== ATTENDEE MANAGEMENT ==========
app.get("/api/attendees", async (req, res) => {
  try {
    const attendees = await User.find({ role: "user" }, "name email");
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/attendees/admin", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }, "name email");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/attendees/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Attendee removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== AUTH / ADMIN ROUTES ==========
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
