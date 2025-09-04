import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import { customError } from "../utils/customError.js";
import bcrypt from "bcrypt";

// @desc    get authenticated user Info
// route    GET /api/users/profile
export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -status -deleted -createdAt -updatedAt -__v")
      .populate("role", "name");
    if (!user) {
      return next(new customError("No user Found", 404));
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    update authenticated user Info
// route    PUT /api/users/:id
export const updateUserInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedInfo = req.body;

    if (req.user.id !== id) {
      return next(new customError("Not authorized to update this user", 403));
    }

    // Find and update user info
    const user = await User.findByIdAndUpdate(id, updatedInfo, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new customError("User Not Found", 404));
    }

    const data = {
      id: user._id,
      fullName: `${user.firstname} ${user.lastname}`.trim(),
      email: user.email,
    };

    res
      .status(200)
      .json({ success: true, message: "User Info Updated", data: data });
  } catch (error) {
    next(error);
  }
};

// @desc    create admin (only by superAdmin)
// route    GET /api/users/create-admin
export const createAdmin = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone, address } = req.body;
    // check if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new customError("Email already in Use", 400));
    }

    // hashPassword
    const hashPassword = await bcrypt.hash(password, 10);

    // find admin Role
    const adminRole = await Role.findOne({ name: "admin" });

    if (!adminRole) {
      return next(
        new customError("Admin role not found. Please seed roles first", 500)
      );
    }

    // create new admin user
    const newAdmin = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      phone,
      password,
      address,
      role: adminRole._id,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: newAdmin._id,
        fullName: `${newAdmin.firstname} ${newAdmin.lastname}`,
        email: newAdmin.email,
        role: "admin",
      },
    });
  } catch (error) {
    next(error);
  }
};
