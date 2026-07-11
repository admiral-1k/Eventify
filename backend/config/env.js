const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "supersecretkey",
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
  superadmin: {
    name: process.env.SUPERADMIN_NAME || "Super Admin",
    email: process.env.SUPERADMIN_EMAIL || "superadmin@eventify.com",
    password: process.env.SUPERADMIN_PASSWORD || "password",
  },
};

module.exports = env;
