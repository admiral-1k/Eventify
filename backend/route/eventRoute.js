

const express = require("express");
const router = express.Router();

const {
  fetchEvents,
  fetchEvent,
  addEvent,
  editEvent,
  removeEvent,
} = require("../controller/eventController");

// Get all events
router.get("/", fetchEvents);

// Get single event
router.get("/:id", fetchEvent);

// Create event
router.post("/", addEvent);

// Update event
router.put("/:id", editEvent);

// Delete event
router.delete("/:id", removeEvent);

module.exports = router;




