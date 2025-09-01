import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role is required"],
      unique: true,
      trim: true,
      lowercase: true,
      enum: ["super_admin", "admin", "user"],
      default: "user",
    },
    slug: { type: String, trim: true },
    has_permissions: [{ type: String }], // list of permissions
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
