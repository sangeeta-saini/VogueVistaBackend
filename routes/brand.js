import express from "express";
import BrandModel from "../models/brand.model.js";
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    let brands = await BrandModel.find();
    brands = brands.map((brand) => {
      brand = brand.toJSON();

      return {
        ...brand,
        value: brand.slug,
        label: brand.name,
      };
    });
    return res.json({
      items: brands,
    });
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
});

export default router;
