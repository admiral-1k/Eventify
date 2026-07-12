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
} = require("../controller/eventController");

describe("Event Controller", () => {
  test("should fetch all events", async () => {

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    eventModel.getAllEvents.mockResolvedValue([
      {
        id: 1,
        title: "Concert"
      }
    ]);

    await fetchEvents(req, res);

    expect(eventModel.getAllEvents).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);

  });
});