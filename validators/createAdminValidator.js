import { body } from "express-validator";

const createAdminValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastname")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Please enter a valid phone number"),

  body("address")
    .optional()
    .isLength({ min: 10, max: 300 })
    .withMessage("Address must be between 10 and 300 characters"),
];

export default createAdminValidator;
