import { body } from "express-validator";

const employeeValidator = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 character for firstname "),
  body("lastname")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Please enter a valid phone number"),
  body("address")
    .trim()
    .optional()
    .isLength({ min: 10, max: 300 })
    .withMessage("Address must be between 10 and 300 characters"),
  body("designation")
    .notEmpty()
    .withMessage("Designation is required")
    .toLowerCase()
    .isIn(["mechanic", "supervisor", "manager"])
    .withMessage("Designation must be either mechanic, supervisor,manager"),
  body("salary")
    .notEmpty()
    .withMessage("Salary is required")
    .isInt({ min: 1 })
    .withMessage("Salary must be greater than 1"),
  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Joining date must be a valid date"),
  body("employmentType")
    .optional()
    .toLowerCase()
    .isIn(["part_time", "full_time", "contract"])
    .withMessage("Type must be either part_time, full_time, contract"),
  body("department")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Department must be at least 2 characters"),
];

export default employeeValidator;
