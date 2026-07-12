const pool = require("../database/db");

// Get all events
const getAllEvents = async () => {
  const result = await pool.query(
    "SELECT * FROM events ORDER BY event_date ASC"
  );

  return result.rows;
};

// Get one event
const getEventById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM events WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Create event
const createEvent = async (
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
) => {
  const result = await pool.query(
    `INSERT INTO events (
      title,
      description,
      category,
      venue,
      event_date,
      event_time,
      image,
      price,
      total_tickets,
      available_tickets,
      organizer_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9,$10)
    RETURNING *`,
    [
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
    ]
  );

  return result.rows[0];
};

// Update event
const updateEvent = async (
  id,
  title,
  description,
  category,
  venue,
  event_date,
  event_time,
  image,
  price,
  total_tickets
) => {
  const result = await pool.query(
    `UPDATE events
     SET
       title = $1,
       description = $2,
       category = $3,
       venue = $4,
       event_date = $5,
       event_time = $6,
       image = $7,
       price = $8,
       total_tickets = $9
     WHERE id = $10
     RETURNING *`,
    [
      title,
      description,
      category,
      venue,
      event_date,
      event_time,
      image,
      price,
      total_tickets,
      id,
    ]
  );

  return result.rows[0];
};

// Delete event
const deleteEvent = async (id) => {
  await pool.query(
    "DELETE FROM events WHERE id = $1",
    [id]
  );
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};