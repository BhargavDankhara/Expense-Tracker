import { Expense } from "../models/expense.model.js";
import csv from "csv-parser";
import fs from "fs";
import multer from "multer";

// Set up multer for file upload
const upload = multer({ dest: "uploads/" });

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, paymentMethod } = req.body;

    if (!amount || !category || !date || !paymentMethod) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const expense = new Expense({
      user: req.user._id,
      amount,
      category,
      date,
      paymentMethod,
    });

    await expense.save();
    res.status(201).json({ success: true, expense });
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Bulk Upload Expenses from CSV
export const uploadExpensesFromCSV = async (req, res) => {
  try {
    const expenses = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        expenses.push({
          user: req.user._id,
          amount: row.amount,
          category: row.category,
          date: new Date(row.date),
          paymentMethod: row.paymentMethod,
        });
      })
      .on("end", async () => {
        await Expense.insertMany(expenses);
        fs.unlinkSync(req.file.path); // Delete the file after processing
        res.status(201).json({
          success: true,
          message: "Expenses uploaded successfully",
          count: expenses.length,
        });
      });
  } catch (error) {
    console.error("Error uploading expenses:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Read Expenses with Filtering, Sorting, and Pagination
export const getExpenses = async (req, res) => {
  try {
    const {
      category,
      startDate,
      endDate,
      paymentMethod,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { user: req.user._id };

    if (category) query.category = category;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(query)
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments(query);

    res.status(200).json({
      success: true,
      expenses,
      totalExpenses,
      totalPages: Math.ceil(totalExpenses / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    if (String(expense.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedExpense });
  } catch (error) {
    console.error("Error updating expense:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    if (String(expense.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await Expense.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Bulk Delete Expenses
export const deleteMultipleExpenses = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of ids
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const result = await Expense.deleteMany({
      _id: { $in: ids },
      user: req.user._id,
    });
    res.status(200).json({
      success: true,
      message: "Expenses deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting expenses:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Aggregation for statistics
export const getExpenseStatistics = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            category: "$category",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching statistics:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
