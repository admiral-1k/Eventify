
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../model/eventModel");

// Get all events
const fetchEvents = async (req, res) => {
  try {
    const events = await getAllEvents();

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// Get one event
const fetchEvent = async (req, res) => {
  try {
    const event = await getEventById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};

// Create event
const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venue,
      event_date,
      event_time,
      image,
      price,
      total_tickets,
      organizer_id,
    } = req.body;

    const event = await createEvent(
      title,
      description,
      category,
      venue,
      event_date,
      event_time,
      image,
      price,
      total_tickets,
      organizer_id
    );

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

// Update event
const editEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venue,
      event_date,
      event_time,
      image,
      price,
      total_tickets,
    } = req.body;

    const event = await updateEvent(
      req.params.id,
      title,
      description,
      category,
      venue,
      event_date,
      event_time,
      image,
      price,
      total_tickets
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

// Delete event
const removeEvent = async (req, res) => {
  try {
    await deleteEvent(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

module.exports = {
  fetchEvents,
  fetchEvent,
  addEvent,
  editEvent,
  removeEvent,
};