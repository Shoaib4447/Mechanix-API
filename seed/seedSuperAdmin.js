import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

console.log("Mongo_URI => ", process.env.MONGO_URI);
dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    let superRole = await Role.findOne({ name: "super_admin" });
    if (!superRole) {
      superRole = await Role.create({ name: "super_admin" });
    }

    // check if the super admin user exist already
    const existingUser = await User.findOne({ email: "super@admin.com" });
    if (existingUser) {
      console.log("Super Admin already exists");
      process.exit(0);
    }

    // hashPassword
    const hashPassword = await bcrypt.hash("SuperAdminPower1", 10);
    await User.create({
      firstname: "Super",
      lastname: "Admin",
      email: "super@admin.com",
      password: hashPassword,
      phone: "+12345678902",
      address: "HQ",
      role: superRole._id,
    });
    console.log("Super admin created successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedSuperAdmin();
