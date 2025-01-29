import express from "express";
import {
  getUserDetailsController,
  loginController,
  registerController,
  updateUserDetailsController,
} from "../controllers/authController.js";
import { uploadImageController } from "../controllers/uploadImageController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user/:email", getUserDetailsController);
router.put("/user/:email", updateUserDetailsController);
router.post("/upload-image", uploadImageController);
export default router;
