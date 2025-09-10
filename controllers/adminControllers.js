import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import { customError } from "../utils/customError.js";

// desc     create employee (only admin)
// @route   POST /api/admin/create-employee
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
// @route   GET /api/admin/get-all-employee
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
