const EventRegistration = require('../models/EventRegisterations');
const User = require('../models/User'); 
const Event = require('../models/Event'); 

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find();

    const enrichedRegistrations = await Promise.all(
      registrations.map(async (reg) => {
        const user = await User.findById(reg.userId);
        const event = await Event.findById(reg.eventId);

        return {
          _id: reg._id,
          userId: reg.userId,
          userName: user ? user.name : 'Unknown',
          eventId: reg.eventId,
          eventName: event ? event.name : 'Unknown Event',
        };
      })
    );

    res.status(200).json(enrichedRegistrations);
  } catch (err) {
    console.error('Error fetching enriched registrations:', err);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
};

module.exports = { getAllRegistrations };
