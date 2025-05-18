import express from "express";
import BagModel from "../models/addbag.model.js";
import ProductsModel from "../models/products.model.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { user_id } = req.headers;

  try {
    // Find or create cart for the user
    let cart = await BagModel.findOne({ userId: user_id });

    if (!cart) {
      return res.json({ items: [] });
    }

    const qtyMapping = {};

    const productIds = cart.items.map((item) => {
      qtyMapping[item.productId] = item.quantity;
      return item.productId;
    });

    let productsData = await ProductsModel.find({
      _id: {
        $in: productIds,
      },
    });

    // productsData = productsData.toJson();
    productsData = productsData.map((product) => {
      const item = product.toJSON();
      delete item.stock;
      delete item.rating;
      return {
        ...item,
        quantity: qtyMapping[item._id],
      };
    });

    res.status(200).json({ items: productsData });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add item to bag" });
  }
});
// Add item to user's cart
router.post("/", async (req, res) => {
  const { user_id } = req.headers;
  const { productId, price, quantity } = req.body;

  if (!productId || !price || !quantity) {
    return res.status(400).json({ error: "Missing required product data" });
  }

  try {
    // Find or create cart for the user
    let cart = await BagModel.findOne({ userId: user_id });

    if (!cart) {
      cart = new BagModel({ userId: user_id, items: [] });
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
        price,
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

router.put("/:productId", async (req, res) => {
  const { user_id } = req.headers;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "productId is required" });
  }

  try {
    const userCart = await BagModel.findOne({ userId: user_id });

    if (!userCart) {
      return res.status(400).send({ message: "cart is empty" });
    }

    let updatedItems = [];
    const qtyMapping = {};
    const productIds = [];
    userCart.items.map((item) => {
      item = item.toJSON();
      if (item.productId === productId) {
        if (quantity > 0) {
          updatedItems.push({
            ...item,
            quantity: quantity,
          });
          qtyMapping[item.productId] = quantity;
          productIds.push(item.productId);
        }
      } else {
        updatedItems.push(item);
        qtyMapping[item.productId] = item.quantity;
        productIds.push(item.productId);
      }
    });

    const updatedCartData = await BagModel.findOneAndUpdate(
      { userId: user_id },
      {
        items: updatedItems,
      },
      {
        new: true,
      }
    );
    const abc = updatedCartData.toJSON();
    let productsData = await ProductsModel.find({
      _id: productIds,
    });

    productsData = productsData.map((product) => {
      const item = product.toJSON();
      delete item.stock;
      delete item.rating;
      return {
        ...item,
        quantity: qtyMapping[item._id],
      };
    });
    res.json({ message: "Quantity updated", items: productsData });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

export default router;
