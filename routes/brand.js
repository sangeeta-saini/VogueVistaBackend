import express from "express";
import BrandModel from "../models/brand.model.js";
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    let brands = await BrandModel.find();
    brands = brands.map((brand) => {
      return {
        ...brand,
        value: brand.slug,
      };
    });
    res.json({
      items: brands,
    });
  } catch (error) {}
});

export default router;
