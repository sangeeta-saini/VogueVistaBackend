import express from "express";
import env from "dotenv";

env.config();

import ProductRoutes from "./routes/products.js";

import UserRoutes from "./routes/user.js";
import AddBagRoutes from "./routes/addBag.js";
import FilterProductRoutes from "./routes/filterProduct.js";
import WishlistRoutes from "./routes/wishlist.js";
import AddressRoutes from "./routes/address.js";
import ProfileRoutes from "./routes/edits.js";
import wishlistdata from "./routes/products.js";
import Begdata from "./routes/bagproducts.js";
import Migration from "./routes/migrate.js";
import OrdersEx from "./routes/ordersEx.js";
import OrdersRoutes from "./routes/orders.js";

import path from "path";

const port = process.env.PORT || 8000;
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/order", OrdersRoutes);

app.use("/cart", AddBagRoutes);
app.use("/filter", FilterProductRoutes);
app.use("/wishlist", WishlistRoutes);
app.use("/address", AddressRoutes);
app.use("/detail", ProfileRoutes);
app.use("/wish", wishlistdata);
// app.use("/cart", Begdata);
app.use("/grate", Migration);
app.use("/orderdetails", OrdersEx);
const dbURL = "mongodb://localhost:27017/dbconnect";
mongoose
  .connect(dbURL)
  .then((result) => {
    console.log("connection is sucessful");
  })
  .catch((error) => {
    console.log("there is an error");
  });
console.log("something is happing here");

app.listen(port, () =>
  console.log(`server is running on port http://localhost:${port}`)
);
