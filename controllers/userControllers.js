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
