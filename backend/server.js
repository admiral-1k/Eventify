const createApp = require("./app");
const env = require("./config/env");
const initializeDatabase = require("./utils/initializeDatabase");
const seedSuperAdmin = require("./utils/seedAdmin");

const app = createApp();

app.listen(env.port, async () => {
  console.log(`Server running on port ${env.port}`);
  try {
    await initializeDatabase();
    await seedSuperAdmin();
  } catch (error) {
    console.error("Database startup failed:", error.message);
  }
});
