import express from "express";
import CONSTANTS from "../common/constants.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    res.json({ items: CONSTANTS.CATEGORIES });
  } catch (error) {}
});

export default router;
