import express from 'express';
const router = express.Router({ mergeParams: true });

const wishlistData = [
  {
    productId: "1",
    name: "Essence Mascara Lash Princess",
    price: 79.99,
    image: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
  },
  {
    productId: "2",
    name: "Eyeshadow Palette with Mirror",
    price: 129.99,
    image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
  },
  {
    productId: "3",
    name: "Powder Canister",
    price: 99.95,
    image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
  },
  {
    productId: "4",
    name: "Red Lipstick",
    price: 59.5,
    image: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
  },
];

// ✅ Add this route to get the full list
router.get('/wishlist/list', (req, res) => {
  res.json({ items: wishlistData });
});

// Keep your existing route if you need single item fetch
router.get('/wishlist/:productId', (req, res) => {
  const { productId } = req.params;
  const item = wishlistData.find(item => item.productId === productId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

export default router;
