import Employee from "../models/employeeModel.js";
import { customError } from "../utils/customError.js";
import Schedule from "../models/scheduleModel.js";

// desc     create employee (only admin)
// @route   POST /api/admins/create-employee
export const createEmployee = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      designation,
      salary,
      joiningDate,
      employmentType,
      department,
      address,
    } = req.body;

    if (req.user.role.name !== "admin") {
      return next(new customError("Only Admin can create Employee", 403));
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee)
      return next(new customError("User Already exist", 400));

    const newEmployee = await Employee.create({
      firstname,
      lastname,
      email,
      phone,
      designation,
      salary,
      joiningDate,
      employmentType,
      department,
      address,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Employee Created",
      data: {
        id: newEmployee._id,
        firstname: newEmployee.firstname,
        lastname: newEmployee.lastname,
        email: newEmployee.email,
        designation: newEmployee.designation,
        createdBy: newEmployee.createdBy,
      },
    });
  } catch (error) {
    next(error);
  }
};

// desc     get all employees(only admin)
// @route   GET /api/admins/get-all-employee
export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ createdBy: req.user.id });

    if (employees.length === 0)
      return next(new customError("No employess found", 404));

    res
      .status(200)
      .json({ success: true, count: employees.length, employees: employees });
  } catch (error) {
    next(error);
  }
};

// desc     create schedule (only admin)
// @route   POST /api/admins/create-schedule
export const createSchedule = async (req, res, next) => {
  try {
    const { daysOfWeek, openTime, closeTime, slotDurationMinutes } = req.body;

    if (openTime >= closeTime) {
      return next(
        new customError("open time must be before then closing time", 400)
      );
    }

    const createdBy = req.user.id;

    const existingSchedule = await Schedule.findOne({ createdBy, daysOfWeek });
    if (existingSchedule) {
      return next(
        new customError(`Schedule for ${daysOfWeek} already exist`, 400)
      );
    }

    const newSchedule = await Schedule.create({
      daysOfWeek,
      openTime,
      closeTime,
      slotDurationMinutes,
      createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: `Schedule created Successfully`,
      data: {
        id: newSchedule._id,
        daysOfWeek: newSchedule.daysOfWeek,
        slotDuration: newSchedule.slotDurationMinutes,
        createdBy: newSchedule.createdBy,
      },
    });
  } catch (error) {
    next(error);
  }
};
