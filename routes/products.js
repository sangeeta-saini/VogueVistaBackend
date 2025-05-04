import express from "express";

import ProductModel from "../models/products.model.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const { category, price_range, brand } = req.query;
    const page = parseInt(req.query?.page || 0) || 1;
    const limit = parseInt(req.query?.limit || 0) || 10;

    const priceArr = price_range?.split?.("-");
    const skip = (page - 1) * limit;

    let filterQuery = {};
    if (category) {
      filterQuery = { ...filterQuery, categories: category };
    }
    if (priceArr?.length) {
      filterQuery = {
        ...filterQuery,
        price: { $gte: Number(priceArr[0]), $lte: Number(priceArr[1]) },
      };
    }
    if (brand) {
      filterQuery = { ...filterQuery, brand };
    }

    const products = await ProductModel.find(filterQuery)
      .skip(skip)
      .limit(limit);

    const total = await ProductModel.countDocuments(filterQuery);
    const has_next = total > skip + limit;
    const has_previous = page > 1;
    res.json({
      items: products,
      page: {
        limit,
        page,
        total,
        has_next,
        has_previous,
      },
    });
  } catch (error) {
    console.log("----error", error);
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query?.page || 0) || 1;
    const limit = parseInt(req.query?.limit || 0) || 10;

    const skip = (page - 1) * limit;

    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }

    const query = { categories: category };
    const products = await ProductModel.find(query).skip(skip).limit(limit);

    const total = await ProductModel.countDocuments(query);
    const has_next = total > skip + limit;
    const has_previous = page > 1;

    console.log(products);
    return res.json({
      items: products,
      page: {
        limit,
        page,
        total,
        has_next,
        has_previous,
      },
    });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
