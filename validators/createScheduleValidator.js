import { body } from "express-validator";

const createScheduleValidator = [
  body("daysOfWeek")
    .notEmpty()
    .withMessage("Day of week is required")
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .withMessage("Invalid day of week"),

  body("openTime")
    .notEmpty()
    .withMessage("Open time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Open time must be in HH:mm (24h) format"),

  body("closeTime")
    .notEmpty()
    .withMessage("Close time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Close time must be in HH:mm (24h) format"),

  body("slotDurationMinutes")
    .notEmpty()
    .withMessage("Slot duration is required")
    .isInt({ min: 5, max: 480 })
    .withMessage("Slot duration must be between 5 and 480 minutes"),
];

export default createScheduleValidator;
