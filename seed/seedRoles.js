import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/roleModel.js";

dotenv.config();

const seedRoles = async () => {
  try {
    // connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
    // check if roles already exist
    const count = await Role.countDocuments();
    if (count > 0) {
      console.log("Roles already seeded!");
      process.exist(0);
    }

    // insert roles
    await Role.insertMany([
      { name: "super_admin" },
      { name: "admin" },
      { name: "user" },
    ]);

    console.log("Roles seeded successfully!");
    process.exit(0); // success exit
  } catch (error) {
    console.error("Error seeding roles:", error);
    process.exit(1); // failure exit
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedRoles();
