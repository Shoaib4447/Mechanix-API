import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import Schedule from "../models/scheduleModel.js";
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

// @desc    User able to see admin/workshop
// route    GET /api/users/all-workshops
export const allWorkShops = async (req, res, next) => {
  try {
    const allUsers = await User.find({ status: { $ne: "blocked" } })
      .populate("role", "name")
      .select("-password");
    const allWorkShops = allUsers.filter((user) => {
      return user.role.name === "admin";
    });
    res.status(200).json({
      success: true,
      message: "All Workshops",
      totalWorkShops: allWorkShops.length,
      data: allWorkShops,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    User able to select one admin/workshop
// route    GET /api/users/workshops/:id
export const singleWorkShop = async (req, res, next) => {
  const id = req.params.id;
  try {
    const workShop = await User.findById(id)
      .populate("role", "name")
      .select("-password");

    if (!workShop) {
      return next(new customError("No Workshop Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Single Workshop",
      data: workShop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    User able to see one admin/workshop Schedules
// route    GET /api/users/workshops/:id/schedule
export const getWorkshopSchedules = async (req, res, next) => {
  const id = req.params.id;
  try {
    const workShop = await User.findById(id)
      .populate("role", "name")
      .select("-password");

    if (!workShop) {
      return next(new customError("No Workshop Found", 404));
    }
    const availableSchedule = await Schedule.find({
      createdBy: workShop._id,
    });

    if (!availableSchedule || availableSchedule.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Schedule found for this WorkShop",
        schedule: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Single Workshop Schedule",
      schedule: availableSchedule,
    });
  } catch (error) {
    next(error);
  }
};
