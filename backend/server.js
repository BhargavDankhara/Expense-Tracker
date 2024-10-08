import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import expenseRoutes from "./routes/expense.route.js"; // Import expense routes
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js"; // Import error handler

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expenses", expenseRoutes); // Use expense routes

app.use(errorHandler); // Use error handler after routes

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
