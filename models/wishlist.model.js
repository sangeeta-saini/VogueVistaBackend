import mongoose from "mongoose";
const schema = mongoose.Schema;

const wishlistSchema = new mongoose.Schema({
 
   userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: String,
        name: String,
        image: String,
        price: Number,
       
      }
    ],
})
export default mongoose.model('wishlist', wishlistSchema);