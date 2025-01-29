import express from "express";
import { uploadImageController } from "../controllers/uploadImageController.js";
import {
  createService,
  getAllService,
  getIdWishService,
} from "../controllers/serviceController.js";
import { addBooking, getAllBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/service", createService);
router.get("/service", getAllService);
router.get("/service/:id", getIdWishService);
router.post("/booking", addBooking);
router.get("/booking", getAllBooking);
router.use("/upload-image", uploadImageController);

export default router;
