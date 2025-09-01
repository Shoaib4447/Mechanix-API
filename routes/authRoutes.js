import express from "express";
import { register, login } from "../controllers/authControllers.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { validateRequest } from "../middlewares/validateRequest .js";
const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, login);

export default router;
