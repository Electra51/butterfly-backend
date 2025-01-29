import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);
const pricePerTimeSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
const detailSchema = new mongoose.Schema(
  {
    question1: {
      type: String,
      required: true,
    },
    ans1: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { _id: false }
);

const worksHowSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const servicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    discount: {
      type: String,
    },
    review: [reviewSchema],
    average_rating: {
      type: String,
      default: "0",
    },
    price: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    tag: [
      {
        type: String,
      },
    ],
    img: {
      type: String,
    },
    material: [
      {
        type: String,
      },
    ],
    detail: [detailSchema],
    works_how: [worksHowSchema],
    price_per_time: [pricePerTimeSchema],
    status: [
      {
        type: String,
        enum: ["Trending", "Featured", "Reject", "Pending"],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("services", servicesSchema);
