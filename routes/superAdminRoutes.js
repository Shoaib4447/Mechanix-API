import {
  createAdmin,
  blockUnblockStatus,
  getAllAdmin,
} from "../controllers/superAdminControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import createAdminValidator from "../validators/createAdminValidator.js";
import { validateRequest } from "../middlewares/validateRequest .js";
import { updateStatusValidator } from "../validators/userValidator.js";
import express from "express";

const router = express.Router();
// Only super_admin can create admin (createAdmin) api
router.post(
  "/create-admin",
  verifyToken,
  authorizeRoles("super_admin"),
  createAdminValidator,
  validateRequest,
  createAdmin
);

// Only super_admin can block/unblock admin
router.patch(
  "/:id/status",
  verifyToken,
  authorizeRoles("super_admin"),
  updateStatusValidator,
  validateRequest,
  blockUnblockStatus
);

// get all admins for super_admin
router.get(
  "/alladmins",
  verifyToken,
  authorizeRoles("super_admin"),
  getAllAdmin
);
export default router;
