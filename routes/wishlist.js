import express from "express";

import WishlistSchema from "../models/wishlist.model.js";
import ProductsModel from "../models/products.model.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const { user_id } = req.headers;
    if (!user_id) {
      return res.status(400).json({ message: "User not logged in!" });
    }
    const wishlist = await WishlistSchema.findOne({
      userId: user_id,
    });

    if (!wishlist) {
      return res.json({ items: [] });
    }

    const productsData = await ProductsModel.find({
      _id: {
        $in: wishlist.items,
      },
    });
    res.json({
      items: productsData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { product_id, user_id } = req.body;

  try {
    let wishlist = await WishlistSchema.findOne({ userId: user_id });

    if (!wishlist) {
      wishlist = new WishlistSchema({ userId: user_id, items: [product_id] });
      await wishlist.save();

      const productsData = await ProductsModel.find({ _id: product_id });

      return res.json({
        items: productsData,
      });
    }

    const alreadyExists = wishlist.items.find((item) => item === product_id);

    if (!alreadyExists) {
      wishlist.items.push(product_id);
      await wishlist.save();
    }

    const productsData = await ProductsModel.find({
      _id: {
        $in: wishlist.items,
      },
    });

    res.json({
      items: productsData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:userId/:productId", async (req, res) => {
  try {
    const wishlist = await WishlistSchema.findOne({
      userId: req.params.userId,
    });

    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.productId !== req.params.productId
    );
    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
