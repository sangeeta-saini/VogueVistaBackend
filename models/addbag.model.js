import mongoose from "mongoose";
const schema = mongoose.Schema;



const BagItemSchema = new mongoose.Schema({
   productId: { 
      type: String, 
      ref: 'Product'
    },

   quantity:
    { 
      type: Number, 
      default: 1 
   },
 });


 const BagSchema = new mongoose.Schema({
   userId: { 
      type: String,
       ref: 'User',
        required: true 
      },

   items:[BagItemSchema],

 });
 

export default mongoose.model("addbag" , BagSchema);