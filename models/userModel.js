import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "FirstName is required"],
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 8,
    },
    phone: {
      type: String,
      required: [true, "Phone Number required"],
      match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
    },
    address: { type: String, min: 10, max: 300 },

    profile_img_url: { type: String, default: null },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
export default User;
