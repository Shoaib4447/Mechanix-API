import { validationResult } from "express-validator";
import { customError } from "../utils/customError.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg; // show first error only
    return next(new customError(firstError, 400));
  }
  next(); // No errors → move to controller
};
