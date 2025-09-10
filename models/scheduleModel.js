import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    daysOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    openTime: {
      type: String,
      match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"],
      required: true,
    },
    closeTime: {
      type: String,
      match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"],
      required: true,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    slotDurationMinutes: { type: Number, required: true, min: 15, max: 240 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

scheduleSchema.index({ createdBy: 1, daysOfWeek: 1 }, { unique: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
