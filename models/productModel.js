import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    value: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategory",
    },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: [
      {
        type: String,
        enum: ["Trending", "Featured", "Reject", "Pending"],
      },
    ],
    image: [
      {
        type: String,
      },
    ],
    featuredImage: {
      type: String,
    },
    comments: [commentSchema],
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
