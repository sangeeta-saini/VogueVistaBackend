import mongoose from "mongoose";
const schema = mongoose.Schema;

const BagItemSchema = new mongoose.Schema({
  productId: String,
  price: Number,
  quantity: Number,
});

const BagSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [BagItemSchema],
});

export default mongoose.model("addbag", BagSchema);
