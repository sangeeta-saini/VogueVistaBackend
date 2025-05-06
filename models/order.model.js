import mongoose from "mongoose";
const schema = mongoose.Schema;

const OrderSchema = new schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  shippingAddress: {
    name: String,
    typeOfAddress: String,
    address: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    mobile: String,
  },
  paymentMethod: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },
});

export default mongoose.model("orders", OrderSchema);
