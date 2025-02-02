import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestseller: { type: Boolean }, // Corrected
  latestProduct: { type: Boolean }, // Corrected
  date: { type: Number, required: true }, // Corrected
});

const productModal =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModal;
