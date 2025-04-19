import express from 'express';

import FilterProductModel from '../models/filterProduct.model.js'

const router = express.Router({ mergeParams: true });

router.post('/api/products', async (req, res) => {
    const { category, minPrice, maxPrice, color, discount } = req.query;
  
    
    let query = {};
  
   
    if (category) {
      const categories = category.split(',');
      query.category = { $in: categories };
    }
  
    
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
  
    if (color) {
      const colors = color.split(',');
      query.color = { $in: colors };
    }
  
   
    if (discount) {
      query.discount = { $gte: parseFloat(discount) };
    }
  
    try {
      const products = await FilterProductModel.find(query);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
  

  export default router;