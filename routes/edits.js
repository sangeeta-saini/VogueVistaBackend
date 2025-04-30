import express from "express";

import EditsModel from "../models/saveEdits.model.js";

const router = express.Router({ mergeParams: true });

router.post("/profile", async (req, res) => {
  const { name, mobile, email, gender, birth, alternateMobile } = req.body;

  try {
    const newEdits = await EditsModel.create({
      name,
      mobile,
      email,
      gender,
      birth,
      alternateMobile,
    });

    res.status(201).json({
      success: true,
      message: "Edits saved",
      data: newEdits,
    });
  } catch (err) {
    console.error("Error saving edits:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      gender: user.gender,
      birth: user.birth,
      alternateMobile: user.alternateMobile,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
