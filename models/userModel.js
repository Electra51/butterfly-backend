import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 0, // 0 = Normal User, 1 = Admin
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    age: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
