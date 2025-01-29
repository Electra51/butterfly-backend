import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategoryById);
router.delete("/categories/:id", deleteCategoryById);

export default router;
