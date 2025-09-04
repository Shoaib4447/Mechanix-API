import express from "express";
import {
  getUserInfo,
  createAdmin,
  updateUserInfo,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import createAdminValidator from "../validators/createAdminValidator.js";
import { validateRequest } from "../middlewares/validateRequest .js";

const router = express.Router();

// get user info
router.get("/profile", verifyToken, getUserInfo);

// update user info,
router.put("/:id", verifyToken, updateUserInfo);

// Only super_admin can create admin (createAdmin) api
router.post(
  "/create-admin",
  verifyToken,
  authorizeRoles("super_admin"),
  createAdminValidator,
  validateRequest,
  createAdmin
);

export default router;
