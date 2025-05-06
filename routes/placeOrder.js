import express from "express";
import OrderModel from "../models/order.model.js";
import BagModel from "../models/addbag.model.js";

const router = express.Router({ mergeParams: true });

// POST /orders/place
router.post("/", async (req, res) => {
  try {
    const { user_id } = req.headers; // getting userId from headers
    const { items, shippingAddress, paymentMethod } = req.body;
    console.log("Received user_id:", user_id);

    // Validate required fields
    if (
      !user_id ||
      !items ||
      items.length === 0 ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create and save the order
    const order = new OrderModel({
      userId: user_id,
      items,
      shippingAddress,
      paymentMethod,
      orderDate: new Date(),
    });

    await order.save();

    // Clear the user's cart
    await BagModel.deleteMany({ userId: user_id });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
