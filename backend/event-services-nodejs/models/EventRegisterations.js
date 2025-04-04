const mongoose = require('mongoose');

const EventRegistrationSchema = new mongoose.Schema({
  userId: String,
  eventId: String,
  registeredAt: { type: Date,default: Date.now }
}, { collection: 'event_registrations' });

module.exports = mongoose.model('EventRegistration', EventRegistrationSchema);
