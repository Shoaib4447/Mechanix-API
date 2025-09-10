import express from "express";
import employeeValidator from "../validators/employeeValidator.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import createScheduleValidator from "../validators/createScheduleValidator.js";
import { validateRequest } from "../middlewares/validateRequest .js";
import {
  createEmployee,
  getAllEmployees,
  createSchedule,
} from "../controllers/adminControllers.js";
const router = express.Router();

// create Employe for admin only
router.post(
  "/create-employee",
  verifyToken,
  authorizeRoles("admin"),
  employeeValidator,
  validateRequest,
  createEmployee
);

// get all employees
router.get(
  "/get-all-employee",
  verifyToken,
  authorizeRoles("admin"),
  getAllEmployees
);

// create schedule (workshop admin only)
router.post(
  "/create-schedule",
  verifyToken,
  authorizeRoles("admin"),
  createScheduleValidator,
  validateRequest,
  createSchedule
);

export default router;
