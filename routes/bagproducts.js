import express from "express";
const router = express.Router({ mergeParams: true });

const BagData = [
  {
    productId: "1",
    name: "Essence Mascara Lash Princess",
    price: 79.99,
    quantity: 1,
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
  },
  {
    productId: "2",
    name: "Eyeshadow Palette with Mirror",
    price: 129.99,
    quantity: 1,
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
  },
  {
    productId: "3",
    name: "Powder Canister",
    price: 99.95,
    quantity: 1,
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
  },
  {
    productId: "4",
    name: "Red Lipstick",
    price: 59.5,
    quantity: 1,
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
  },
];

// ✅ Add this route to get the full list
router.get("/addtobag", (req, res) => {
  res.json({ items: BagData });
});

// Keep your existing route if you need single item fetch
router.get("/bag/:productId", (req, res) => {
  const { productId } = req.params;
  const item = BagData.find((item) => item.productId === productId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/cart/:productId", (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  const index = BagData.findIndex((item) => item.productId === productId);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found in bag" });
  }

  BagData[index].quantity = quantity;
  res.json({ message: "Quantity updated", item: BagData[index] });
});

export default router;
