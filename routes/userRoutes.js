import express from "express";
import { getUserInfo } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/profile", verifyToken, getUserInfo);

export default router;
