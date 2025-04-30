import express from "express";
import axios from "axios";
import ProductModel from "../models/products.model.js";
import BrandModel from "../models/brand.model.js";

import CONSTANTS from "../common/constants.js";
const router = express.Router({ mergeParams: true });

router.post("/migrate", async (req, res) => {
  try {
    for (const category of CONSTANTS.CATEGORIES) {
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      const products = data.products[0];
      let productData = data.products.map((product) => {
        return {
          images: product.images || [],
          name: product.title,
          description: product.description,
          brand: product.brand,
          price: product.price * 80, // as prices are in $
          categories: product.tags,
          stock: 100,
          rating: product.rating,
        };
      });
      productData = productData.filter((product) => {
        const { name, description, brand, price, categories } = product;

        if (
          !name ||
          !description ||
          !brand ||
          !price ||
          (!categories && !categories.length)
        ) {
          return false;
        }
        return true;
      });
      if (productData.length) {
        // await ProductModel.insertMany(productData);
        const brands = productData.map((product) => {
          let slug = product.brand.toLowerCase();
          slug = slug.split(" ").join("-");
          return {
            slug,
            name: product.brand,
          };
        });
        await BrandModel.insertMany(brands);
      }
    }

    res.json({ message: "data migrated successfully" });
  } catch (error) {
    console.log("error---", error);
    res.status(500).json({ error: "failed to fetch data" });
  }
});

export default router;
