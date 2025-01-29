import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("productCategory", productCategorySchema);
