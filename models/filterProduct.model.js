import mongoose from "mongoose";
const schema = mongoose.Schema;


const filterProductSchema = new mongoose.Schema({
    category:{
        type: String, 
        required: true 
    },

    price:{
        type: Number,
        required:true,
    },

    color:{
        type:String,
        required:true
    },

    discount:{
        type:String,
        required:true
    }

});
  
export default mongoose.model('FilterProduct', filterProductSchema);