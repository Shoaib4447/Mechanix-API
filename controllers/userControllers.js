import User from "../models/userModel.js";
import { customError } from "../utils/customError.js";

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
