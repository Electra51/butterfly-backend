import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure multer-cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // folder name in cloudinary
    allowed_formats: ["jpeg", "jpg", "png", "gif"], // allowable file types
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // custom file name
  },
});

const upload = multer({ storage: storage }).single("image");

// image upload controller
export const uploadImageController = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json({ message: "Error uploading image", error: err });
      } else {
        console.log(req.file); // file details from cloudinary
        const imageUrl = req.file.path; // cloudinary url
        res.status(200).json({ url: imageUrl });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export default router;
