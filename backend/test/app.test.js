const request = require("supertest");
const createApp = require("../app");

jest.mock("../config/database", () => ({
  query: jest.fn().mockResolvedValue({
    rows: [{ now: new Date() }],
  }),
}));

const app = createApp();

describe("Application Health Endpoints", () => {

  test("GET / should return success", async () => {

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

  });

  test("GET /api/health should return api status", async () => {

    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.api).toBe("ok");

  });

});