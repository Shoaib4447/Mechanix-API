import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customError } from "../utils/customError.js";
import Role from "../models/roleModel.js";

export const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone, address, role } =
      req.body;

    // 2. check if user already exists
    const existingUser = await User.findOne({ email }).populate("role");
    if (existingUser) {
      throw new customError("Email already in use ", 400);
    }
    // find role
    const userRole = await Role.findOne({ name: "user" });

    // hash password
    const hashedPassoword = await bcrypt.hash(password, 10);

    // 4. Create User
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassoword,
      phone,
      address,
      role: userRole._id,
    });

    // User Created
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
    });
  } catch (error) {
    // Pass error to middleware
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return next(new customError("Invalid credentials", 401));
    }

    if (user.status === "blocked") {
      return next(new customError("Account blocked", 401));
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new customError("Invalid credentials", 401));
    }

    const payload = {
      id: user._id,
      firstname: user.firstname,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      id: user._id,
      role: user.role.name,
      token,
    });
  } catch (error) {
    next(error);
  }
};
