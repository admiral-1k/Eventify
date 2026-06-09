const bcrypt = require("bcrypt");
const { createUser, getUsersByRole } = require("../model/userModel");

const seedSuperAdmin = async () => {
  try {
    const superadmins = await getUsersByRole("superadmin");
    
    if (superadmins.length === 0) {
      console.log("No superadmin found. Creating default superadmin...");
      const hashedPassword = await bcrypt.hash("password", 10);
      await createUser(
        "Super Admin",
        "superadmin@eventify.com",
        hashedPassword,
        "superadmin"
      );
      console.log("Default superadmin created successfully. (Email: superadmin@eventify.com, Password: password)");
    } else {
      console.log("Superadmin already exists. No need to create.");
    }
  } catch (error) {
    console.error("Error seeding superadmin:", error);
  }
};

module.exports = seedSuperAdmin;
