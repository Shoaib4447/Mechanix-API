import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required of min 3 characters"],
      trim: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
    },
    designation: {
      type: String,
      enum: ["mechanic", "supervisor", "manager"],
      required: [true, "Designation is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: 1,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    employmentType: {
      type: String,
      enum: ["part_time", "full_time", "contract"],
      default: "full_time",
    },
    department: { type: String, trim: true },
    address: { type: String, minlength: 10, maxlength: 300, trim: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
