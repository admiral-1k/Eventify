-- =============================================
-- Eventify Database Setup
-- Run this file in pgAdmin Query Tool
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'eventor', 'superadmin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- After running this, restart your backend.
-- The server will automatically seed the 
-- superadmin account on startup.
-- =============================================
