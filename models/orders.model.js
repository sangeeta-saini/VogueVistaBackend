import mongoose from "mongoose";
const schema = mongoose.Schema;

const orderschema = new schema({
  items: {
    type: [
      {
        id: String,
        quantity: Number,
      },
    ],
    default: [],
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("orders", orderschema);
