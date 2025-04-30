import mongoose from "mongoose";
const schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  brand: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },

  categories: { type: Array, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  images: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Products", productSchema);
