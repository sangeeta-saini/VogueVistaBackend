import mongoose from "mongoose";
const schema = mongoose.Schema;

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [String],
});
export default mongoose.model("wishlist", wishlistSchema);
