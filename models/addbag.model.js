import mongoose from "mongoose";
const schema = mongoose.Schema;



const BagItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  images: String,
  quantity: Number
 });


 const BagSchema = new mongoose.Schema({
  userId: String,
  items: [BagItemSchema]

 });
 

export default mongoose.model("addbag" , BagSchema);