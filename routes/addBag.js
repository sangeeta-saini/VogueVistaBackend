import express from 'express';

import BagModel from '../models/addbag.model.js';

const router = express.Router({ mergeParams: true });


router.post('/bag', async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      let bag = await BagModel.findOne({ userId });
  
      if (!bag) {
        bag = new BagModel({ userId, items: [] });
      }
  
      const existingItem = bag.items.find(item => item.productId.toString() === productId);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        bag.items.push({ productId, quantity });
      }
  
      await bag.save();
      res.json({ success: true, message: 'Item added to bag', bag });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });


export default router;