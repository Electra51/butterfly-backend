import express from "express";
import {
  createProductCategory,
  deleteProductCategoryById,
  getProductCategories,
  getProductCategoryById,
  updateProductCategoryById,
} from "../controllers/productCategoryController.js";

const router = express.Router();

router.post("/product-categories", createProductCategory);
router.get("/product-categories", getProductCategories);
router.get("/product-categories/:id", getProductCategoryById);
router.put("/product-categories/:id", updateProductCategoryById);
router.delete("/product-categories/:id", deleteProductCategoryById);

export default router;
