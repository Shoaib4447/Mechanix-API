import express from "express";
import {
  getUserInfo,
  updateUserInfo,
  allWorkShops,
  singleWorkShop,
  getWorkshopSchedules,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import createAdminValidator from "../validators/createAdminValidator.js";
import { validateRequest } from "../middlewares/validateRequest .js";
import { updateStatusValidator } from "../validators/userValidator.js";

const router = express.Router();

// get user info
router.get("/profile", verifyToken, getUserInfo);

// update user info,
router.put("/:id", verifyToken, updateUserInfo);

// get all admin/workshops
router.get("/workshops", verifyToken, authorizeRoles("user"), allWorkShops);

// get single admin/workshops
router.get(
  "/workshops/:id",
  verifyToken,
  authorizeRoles("user"),
  singleWorkShop
);

// get single admin/workshops schedules
router.get(
  "/workshops/:id/schedules",
  verifyToken,
  authorizeRoles("user"),
  getWorkshopSchedules
);

export default router;
