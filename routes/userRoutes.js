import express from "express";
import { getUserInfo, createAdmin } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
const router = express.Router();

router.get("/profile", verifyToken, getUserInfo);
router.post(
  "/create-admin",
  verifyToken,
  authorizeRoles("super_admin"),
  createAdmin
);

export default router;
