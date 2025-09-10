import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/super_admin", superAdminRoutes);
app.use("/api/admins", adminRoutes);
//DB connection
dbConnect();

// error handler should be the last middleware
app.use(errorHandler);

// PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Serve running at PORT ${PORT}`);
});
export default app;
