import { body } from "express-validator";

export const updateStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["active", "blocked"])
    .withMessage("Status must be either 'active' or 'blocked'"),
];
