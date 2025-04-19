import express from 'express';

import ProfileModel from '../models/profile.model.js';

const router = express.Router({ mergeParams: true });

router.post('/userId', async (req, res) => {
    try {
      const user = await ProfileModel.create(req.body);
    //   if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });


  router.put('/userId', async (req, res) => {
    const updates = req.body; 
    try {
      const user = await ProfileModel.findByIdAndUpdate(req.params.userId, updates, { new: true });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.json({ success: true, message: 'Profile updated', user });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });


export default router;