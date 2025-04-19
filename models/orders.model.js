import mongoose from "mongoose";
const schema = mongoose.Schema;

const orderschema = new schema({
     
    
    userId:{
    type: String,
    required: true,
    
},

    productId: {
        type: String,
        required: true,
    },
address: {
    id: String,
    userId: String,
    fullName: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
    phone: Number,
  },



  totalAmount:{
    type:Number,
    required: true 
  },

  status: { 
    type: String,
     enum: ['pending', 'shipped', 'delivered'],
      default: 'pending' 
    },

  
  orderPlacedOn:{
    type: Date, 
    default: Date.now
  },

    });

export default mongoose.model("orders" , orderschema);