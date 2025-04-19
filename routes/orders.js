import express from 'express';

import ordersModel from '../models/orders.model.js';


const router = express.Router({ mergeParams: true });



router.post('/orders', async (req, res) => {
    try {
        const newOrder = new ordersModel(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }

});


router.get('/orders', async (req, res) => {
    try {
      const orders = await ordersModel.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatedOrder = await ordersModel.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json(updatedOrder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await ordersModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;