
import express from 'express';

import ProductDescriptionModel from '../models/productDescription.model.js';

const router = express.Router({ mergeParams: true });

router.get('/products', async (req, res) => {
    try {
      const products = await ProductDescriptionModel.create(req.body);
      console.log(req.body)
       return res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  router.get('/products/:id', async (req, res) => {
    try {
      const product = await ProductDescriptionModel.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
       return res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  



export default router;