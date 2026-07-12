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

  });

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

  });

  describe("addEvent", () => {

    test("should create new event", async () => {

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

      eventModel.createEvent.mockResolvedValue(req.body);

      await addEvent(req, res);

      expect(eventModel.createEvent).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);

    });

  });

  describe("editEvent", () => {

    test("should update event", async () => {

      req.params.id = 1;

      req.body = {
        title: "Updated Event",
      };

      eventModel.updateEvent.mockResolvedValue({
        id: 1,
      });

      await editEvent(req, res);

      expect(eventModel.updateEvent).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(200);

    });

  });

  describe("removeEvent", () => {

    test("should delete event", async () => {

      req.params.id = 1;

      eventModel.deleteEvent.mockResolvedValue();

      await removeEvent(req, res);

      expect(eventModel.deleteEvent).toHaveBeenCalledWith(1);

      expect(res.status).toHaveBeenCalledWith(200);

    });

  });

});