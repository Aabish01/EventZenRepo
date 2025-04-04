const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], required: true }
});

module.exports = mongoose.model("Event", EventSchema);
