// Other imports remain the same
import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  uploadExpensesFromCSV,
  deleteMultipleExpenses,
  getExpenseStatistics,
} from "../controllers/expense.controller.js";
import { cacheMiddleware } from "../middleware/cache.js";
import { protectRoute } from "../middleware/protectRoute.js";
import multer from "multer";

const router = express.Router();

// Set up multer for file upload
const upload = multer({ dest: "uploads/" });

router.use(protectRoute); // Protect all routes with authentication

router.post("/createxp", createExpense);
router.post("/upload", upload.single("file"), uploadExpensesFromCSV);
router.get("/get", cacheMiddleware, getExpenses); // Use caching middleware
router.patch("/update/:id", updateExpense);
router.delete("/delete/:id", deleteExpense);
router.delete("/bulk-delete", deleteMultipleExpenses);
router.get("/statistics", getExpenseStatistics);

export default router;
