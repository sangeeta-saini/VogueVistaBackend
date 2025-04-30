import express from "express";
import BagModel from "../models/addbag.model.js";

const router = express.Router({ mergeParams: true });

// Add item to user's cart
router.post("/", async (req, res) => {
  const { user_id } = req.headers;
  const { productId, title, price, images, quantity } = req.body;

  if (!productId || !title || !price || !images || !quantity) {
    return res.status(400).json({ error: "Missing required product data" });
  }

  try {
    // Find or create cart for the user
    let cart = await BagModel.findOne({ userId: user_id });

    if (!cart) {
      cart = new BagModel({ userId, items: [] });
    }

    // Check if item is already in cart
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        title,
        price,
        images,
        quantity,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to bag", items: cart.items });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add item to bag" });
  }
});

router.put("/addtobag/:productId", async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1)
    return res.status(400).json({ error: "Quantity must be at least 1" });

  try {
    const updated = await BagModel.findOneAndUpdate(
      { productId },
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Item not found in bag" });
    }

    res.json({ message: "Quantity updated", items: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

export default router;
