const eventModel = require("../model/eventModel");

jest.mock("../model/eventModel", () => ({
  getAllEvents: jest.fn(),
  getEventById: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
}));

const {
  fetchEvents,
  fetchEvent,
  addEvent,
  editEvent,
  removeEvent,
} = require("../controller/eventController");

describe("Event Controller Tests", () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // ---------------- Fetch All Events ----------------

  describe("fetchEvents", () => {

    test("should return all events", async () => {

      const events = [
        {
          id: 1,
          title: "Music Concert",
        },
      ];

      eventModel.getAllEvents.mockResolvedValue(events);

      await fetchEvents(req, res);

      expect(eventModel.getAllEvents).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: events,
      });

    });

    test("should return 500 if fetching events fails", async () => {

      eventModel.getAllEvents.mockRejectedValue(new Error("Database Error"));

      await fetchEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to fetch events",
      });

    });

  });

  // ---------------- Fetch Single Event ----------------

  describe("fetchEvent", () => {

    test("should return single event", async () => {

      req.params.id = 1;

      const event = {
        id: 1,
        title: "Concert",
      };

      eventModel.getEventById.mockResolvedValue(event);

      await fetchEvent(req, res);

      expect(eventModel.getEventById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);

    });

    test("should return 404 if event not found", async () => {

      req.params.id = 99;

      eventModel.getEventById.mockResolvedValue(null);

      await fetchEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

    });

    test("should return 500 if fetching single event fails", async () => {

      req.params.id = 1;

      eventModel.getEventById.mockRejectedValue(new Error("Database Error"));

      await fetchEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to fetch event",
      });

    });

  });

  // ---------------- Add Event ----------------

  describe("addEvent", () => {

    beforeEach(() => {
      req.body = {
        title: "Rock Show",
        description: "Live",
        category: "Music",
        venue: "Kathmandu",
        event_date: "2026-08-01",
        event_time: "6 PM",
        image: "image.jpg",
        price: 500,
        total_tickets: 100,
        organizer_id: 1,
      };
    });

    test("should create new event", async () => {

      eventModel.createEvent.mockResolvedValue(req.body);

      await addEvent(req, res);

      expect(eventModel.createEvent).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);

    });

    test("should return 500 if event creation fails", async () => {

      eventModel.createEvent.mockRejectedValue(new Error("Database Error"));

      await addEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to create event",
      });

    });

  });

  // ---------------- Edit Event ----------------

  describe("editEvent", () => {

    beforeEach(() => {
      req.params.id = 1;

      req.body = {
        title: "Updated Event",
      };
    });

    test("should update event", async () => {

      eventModel.updateEvent.mockResolvedValue({
        id: 1,
      });

      await editEvent(req, res);

      expect(eventModel.updateEvent).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);

    });

    test("should return 500 if update fails", async () => {

      eventModel.updateEvent.mockRejectedValue(new Error("Database Error"));

      await editEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to update event",
      });

    });

  });

  // ---------------- Delete Event ----------------

  describe("removeEvent", () => {

    beforeEach(() => {
      req.params.id = 1;
    });

    test("should delete event", async () => {

      eventModel.deleteEvent.mockResolvedValue();

      await removeEvent(req, res);

      expect(eventModel.deleteEvent).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);

    });

    test("should return 500 if delete fails", async () => {

      eventModel.deleteEvent.mockRejectedValue(new Error("Database Error"));

      await removeEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to delete event",
      });

    });

  });

});