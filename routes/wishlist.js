import express from 'express';

import WishlistSchema from '../models/wishlist.model.js';

const router = express.Router({ mergeParams: true });

router.get('/:userId', async (req, res) => {
    try {
      const wishlist = await WishlistSchema.findOne({ userId: req.params.userId });
      res.json(wishlist || { userId: req.params.userId, items: [] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  router.post('/:userId', async (req, res) => {
    const { productId, name, image, price } = req.body;
  
    try {
      let wishlist = await WishlistSchema.findOne({ userId: req.params.userId });
  
      if (!wishlist) {
        wishlist = new WishlistSchema({ userId: req.params.userId, items: [] });
      }
  
      const alreadyExists = wishlist.items.find(item => item.productId === productId);
  
      if (!alreadyExists) {
        wishlist.items.push({ productId, name, image, price });
        await wishlist.save();
      }
  
      res.json(wishlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  router.delete('/:userId/:productId', async (req, res) => {
    try {
      const wishlist = await WishlistSchema.findOne({ userId: req.params.userId });
  
      if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
  
      wishlist.items = wishlist.items.filter(item => item.productId !== req.params.productId);
      await wishlist.save();
  
      res.json(wishlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


export default router;