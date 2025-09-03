import { customError } from "../utils/customError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role.name)) {
      return next(
        new customError("Access denied: insufficient permissions", 403)
      );
    }
    next();
  };
};
