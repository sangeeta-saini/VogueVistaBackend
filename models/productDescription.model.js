import mongoose from "mongoose";
const schema = mongoose.Schema;


const productDescriptionSchema = new mongoose.Schema({
    name: 
    { type: String, 
        required: true 
    },
    description:
     { type: String,
         required: true
         },

         brand:
     { type: String,
         required: true
         },
    price:
     { 
        type: Number,
         required: true
         },
    
    category:
     { type: String, 
        required: true 
    },
    stock: 
    { type: Number,
         required: true
         },
    rating:
     { type: Number, 
        default: 0 
    },
    
  });
  
  export default mongoose.model('ProductDescription', productDescriptionSchema);