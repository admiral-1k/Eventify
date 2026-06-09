const bcrypt = require("bcrypt");
const { createUser, getUsersByRole } = require("../model/userModel");

const seedSuperAdmin = async () => {
  try {
    const superadmins = await getUsersByRole("superadmin");

    if (superadmins.length === 0) {
      const name = process.env.SUPERADMIN_NAME || "Super Admin";
      const email = process.env.SUPERADMIN_EMAIL || "superadmin@eventify.com";
      const password = process.env.SUPERADMIN_PASSWORD || "password";

      console.log("No superadmin found. Creating default superadmin...");
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(name, email, hashedPassword, "superadmin");
      console.log(`Superadmin created successfully. (Email: ${email})`);
    } else {
      console.log("Superadmin already exists. No need to create.");
    }
  } catch (error) {
    console.error("Error seeding superadmin:", error.message);
  }
};

module.exports = seedSuperAdmin;
